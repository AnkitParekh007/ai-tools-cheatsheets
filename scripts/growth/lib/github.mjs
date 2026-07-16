import { execFileSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { collectExternalMetrics } from "./external-adapters.mjs";

const REST_BASE_URL = "https://api.github.com";
const GRAPHQL_PATH = "/graphql";
export const MAINTAINER_ASSOCIATIONS = new Set(["OWNER", "MEMBER", "COLLABORATOR"]);

export async function createGitHubClient({
  token = resolveGitHubToken(),
  repository,
  timeoutMs = 20000,
  retries = 2,
  userAgent = "ai-tools-cheatsheets-growth-review"
} = {}) {
  if (!repository) {
    throw new Error("repository is required");
  }
  const [owner, repo] = repository.split("/");
  return {
    owner,
    repo,
    repository,
    token,
    timeoutMs,
    retries,
    userAgent,
    async getJson(url, options = {}) {
      return requestJson({ token, userAgent, timeoutMs, retries, url, ...options });
    },
    async getRepo() {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}`);
    },
    async graphql(query, variables = {}) {
      const response = await requestJson({
        token,
        userAgent,
        timeoutMs,
        retries,
        url: `${REST_BASE_URL}${GRAPHQL_PATH}`,
        method: "POST",
        body: { query, variables }
      });

      if (response.errors?.length) {
        throw new Error(`GitHub GraphQL error: ${response.errors.map((item) => item.message).join("; ")}`);
      }

      return response.data;
    },
    async searchIssues(query, { perPage = 100, page = 1 } = {}) {
      const search = new URL(`${REST_BASE_URL}/search/issues`);
      search.searchParams.set("q", query);
      search.searchParams.set("per_page", String(perPage));
      search.searchParams.set("page", String(page));
      return this.getJson(search.toString());
    },
    async searchIssueCount(query) {
      const result = await this.searchIssues(query, { perPage: 1, page: 1 });
      return result.total_count ?? 0;
    },
    async paginate(url, { stopWhen } = {}) {
      const all = [];
      let page = 1;
      while (true) {
        const pagedUrl = new URL(url);
        pagedUrl.searchParams.set("per_page", "100");
        pagedUrl.searchParams.set("page", String(page));
        const batch = await this.getJson(pagedUrl.toString());
        const items = Array.isArray(batch) ? batch : batch.items ?? [];
        if (!items.length) {
          break;
        }
        for (const item of items) {
          if (stopWhen?.(item)) {
            return all;
          }
          all.push(item);
        }
        if (items.length < 100) {
          break;
        }
        page += 1;
      }
      return all;
    },
    async listContributors() {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/contributors?anon=1`);
    },
    async listCommits({ since, until, author } = {}) {
      const url = new URL(`${REST_BASE_URL}/repos/${owner}/${repo}/commits`);
      if (since) url.searchParams.set("since", since);
      if (until) url.searchParams.set("until", until);
      if (author) url.searchParams.set("author", author);
      return this.paginate(url.toString());
    },
    async listIssueComments({ since } = {}) {
      const url = new URL(`${REST_BASE_URL}/repos/${owner}/${repo}/issues/comments`);
      if (since) url.searchParams.set("since", since);
      return this.paginate(url.toString());
    },
    async listCommentsForIssue(number) {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/issues/${number}/comments`);
    },
    async getIssue(number) {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/issues/${number}`);
    },
    async getPull(number) {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/pulls/${number}`);
    },
    async listPullReviews(number) {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/pulls/${number}/reviews`);
    },
    async listPullReviewComments(number) {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/pulls/${number}/comments`);
    },
    async listPulls(state = "open") {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/pulls?state=${state}&sort=updated&direction=desc`);
    },
    async listReleases() {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/releases`);
    },
    async listTags() {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/tags`);
    },
    async getTrafficViews() {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/traffic/views`);
    },
    async getTrafficClones() {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/traffic/clones`);
    },
    async getTrafficReferrers() {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/traffic/popular/referrers`);
    },
    async getTrafficPaths() {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/traffic/popular/paths`);
    },
    async listLabels() {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/labels`);
    },
    async listIssues({ state = "all" } = {}) {
      return this.paginate(`${REST_BASE_URL}/repos/${owner}/${repo}/issues?state=${state}&sort=created&direction=desc`);
    },
    async createLabel({ name, color, description }) {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/labels`, {
        method: "POST",
        body: { name, color, description }
      });
    },
    async createIssue({ title, body, labels }) {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/issues`, {
        method: "POST",
        body: { title, body, labels }
      });
    },
    async updateIssue(number, { title, body, labels }) {
      return this.getJson(`${REST_BASE_URL}/repos/${owner}/${repo}/issues/${number}`, {
        method: "PATCH",
        body: { title, body, labels }
      });
    }
  };
}

export function resolveGitHubToken() {
  if (process.env.GROWTH_GITHUB_TOKEN) {
    return process.env.GROWTH_GITHUB_TOKEN;
  }
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }
  if (process.env.GH_TOKEN) {
    return process.env.GH_TOKEN;
  }

  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

export async function requestJson({
  token,
  userAgent,
  timeoutMs,
  retries,
  url,
  method = "GET",
  body = undefined,
  headers = {}
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs);

  try {
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      const response = await fetch(url, {
        method,
        signal: controller.signal,
        headers: {
          Accept: "application/vnd.github+json",
          "Content-Type": body ? "application/json" : undefined,
          Authorization: token ? `Bearer ${token}` : undefined,
          "User-Agent": userAgent,
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if (response.ok) {
        return response.status === 204 ? null : response.json();
      }

      if (shouldRetry(response) && attempt < retries) {
        await delay(getRetryDelay(response, attempt));
        continue;
      }

      const payload = await safeReadJson(response);
      throw new Error(formatGitHubError(response, payload));
    }

    throw new Error("Request retry loop terminated unexpectedly");
  } finally {
    clearTimeout(timeout);
  }
}

export async function collectGitHubSnapshot({
  client,
  config,
  context,
  repoRoot = process.cwd()
}) {
  const warnings = [];
  const errors = [];
  const availability = {};
  const periodStart = context.period.start;
  const periodEnd = context.period.end;
  const repoSearchBase = `repo:${client.repository}`;

  const repo = await client.getRepo();
  const releases = await client.listReleases();
  const contributors = await client.listContributors();
  const commits = await client.listCommits({ since: periodStart, until: periodEnd });

  const openIssues = await client.searchIssueCount(`${repoSearchBase} is:issue is:open`);
  const openPullRequests = await client.searchIssueCount(`${repoSearchBase} is:pr is:open`);
  const newIssues = await client.searchIssueCount(`${repoSearchBase} is:issue created:${periodStart}..${periodEnd}`);
  const closedIssues = await client.searchIssueCount(`${repoSearchBase} is:issue closed:${periodStart}..${periodEnd}`);
  const goodFirstIssueOpen = await client.searchIssueCount(`${repoSearchBase} is:issue is:open label:"good first issue"`);
  const helpWantedOpen = await client.searchIssueCount(`${repoSearchBase} is:issue is:open label:"help wanted"`);

  const activeIssues = await client.searchIssues(
    `${repoSearchBase} is:issue updated:${periodStart}..${periodEnd} sort:comments-desc`,
    { perPage: config.maxHighlightedItems, page: 1 }
  );
  const indexedIssues = await client.listIssues({ state: "all" });
  const indexedIssueItems = indexedIssues.filter((item) => !item.pull_request);
  const indexedPullRequestItems = indexedIssues.filter((item) => item.pull_request);
  const openIssueItems = indexedIssueItems.filter((item) => item.state === "open");
  const issuesCreatedDuringPeriod = indexedIssueItems.filter((item) => item.created_at >= periodStart && item.created_at <= periodEnd);
  const indexedPullMap = new Map(indexedPullRequestItems.map((item) => [item.number, item]));

  const createdPrSearch = await client.searchIssues(
    `${repoSearchBase} is:pr created:${periodStart}..${periodEnd} sort:created-desc`,
    { perPage: 100, page: 1 }
  );

  const createdPrNumbers = createdPrSearch.items.map((item) => item.number);
  const createdPulls = await Promise.all(createdPrNumbers.map((number) => client.getPull(number)));
  const openPulls = await client.listPulls("open");
  const closedPulls = (await client.listPulls("closed")).filter((item) => item.closed_at && item.closed_at >= periodStart && item.closed_at <= periodEnd);
  const mergedPulls = createdPulls.filter((item) => item.merged_at && item.merged_at >= periodStart && item.merged_at <= periodEnd);
  const pullsCreatedDuringPeriod = createdPulls.map((pull) => ({ ...indexedPullMap.get(pull.number), ...pull }));
  const openPullItems = openPulls.map((pull) => ({ ...indexedPullMap.get(pull.number), ...pull }));

  const openPullReviewPairs = await Promise.all(
    openPulls.map(async (pull) => ({
      pull,
      reviews: await client.listPullReviews(pull.number)
    }))
  );

  const awaitingReview = openPullReviewPairs.filter(({ pull, reviews }) => !pull.draft && reviews.filter((review) => review.state !== "PENDING").length === 0).length;

  const firstTimeContributorLogins = [];
  const repeatContributorLogins = [];
  for (const pull of createdPulls) {
    const login = pull.user?.login;
    if (!login) {
      continue;
    }
    const priorPrCount = await client.searchIssueCount(`${repoSearchBase} is:pr author:${login} created:<${periodStart}`);
    if (priorPrCount > 0) {
      repeatContributorLogins.push(login);
    } else {
      firstTimeContributorLogins.push(login);
    }
  }

  const mergedHours = mergedPulls
    .map((pull) => {
      if (!pull.merged_at) return null;
      return (new Date(pull.merged_at).getTime() - new Date(pull.created_at).getTime()) / (1000 * 60 * 60);
    })
    .filter((value) => Number.isFinite(value));

  const acceptedContributorMap = new Map();
  for (const pull of createdPulls.filter((item) => item.merged_at)) {
    const login = pull.user?.login;
    if (!login) continue;
    const entry = acceptedContributorMap.get(login) ?? {
      login,
      mergedPullRequests: 0,
      commits: 0,
      acceptedActivity: 0,
      firstContributionAt: pull.merged_at
    };
    entry.mergedPullRequests += 1;
    entry.acceptedActivity += 1;
    entry.firstContributionAt = minTimestamp(entry.firstContributionAt, pull.merged_at);
    acceptedContributorMap.set(login, entry);
  }

  const commitAuthors = new Map();
  for (const commit of commits) {
    const login = commit.author?.login ?? commit.commit?.author?.email ?? "unknown";
    const entry = commitAuthors.get(login) ?? {
      login,
      commits: 0
    };
    entry.commits += 1;
    commitAuthors.set(login, entry);

    if (commit.author?.login) {
      const accepted = acceptedContributorMap.get(commit.author.login) ?? {
        login: commit.author.login,
        mergedPullRequests: 0,
        commits: 0,
        acceptedActivity: 0,
        firstContributionAt: commit.commit.author?.date ?? context.collectedAt
      };
      accepted.commits += 1;
      accepted.acceptedActivity += 1;
      accepted.firstContributionAt = minTimestamp(accepted.firstContributionAt, commit.commit.author?.date ?? context.collectedAt);
      acceptedContributorMap.set(commit.author.login, accepted);
    }
  }

  for (const entry of acceptedContributorMap.values()) {
    const priorCommitPromise = client.listCommits({ author: entry.login, until: periodStart });
    const priorPrPromise = client.searchIssueCount(`${repoSearchBase} is:pr author:${entry.login} created:<${periodStart}`);
    const [priorCommits, priorPrCount] = await Promise.all([priorCommitPromise, priorPrPromise]);
    entry.isFirstTime = priorPrCount === 0 && priorCommits.length === 0;
  }

  const issueComments = await collectIssueCommentCount({ client, since: periodStart });
  const maintainerIssueMetrics = await collectMaintainerIssueMetrics({
    client,
    warnings,
    openIssues: openIssueItems,
    createdDuringPeriod: issuesCreatedDuringPeriod
  });
  const maintainerPullMetrics = await collectMaintainerPullMetrics({
    client,
    warnings,
    openPulls: openPullItems,
    createdDuringPeriod: pullsCreatedDuringPeriod
  });

  const discussionMetrics = await collectDiscussionMetrics({
    client,
    config,
    context,
    warnings,
    availability
  });

  const trafficMetrics = await collectTrafficMetrics({
    client,
    config,
    context,
    warnings,
    availability
  });
  const externalMetricCollection = await collectExternalMetrics({
    config,
    context,
    repoRoot
  });
  warnings.push(...externalMetricCollection.warnings);

  const latestRelease = releases[0]
    ? {
        tagName: releases[0].tag_name,
        name: releases[0].name,
        publishedAt: releases[0].published_at,
        url: releases[0].html_url
      }
    : null;

  availability.repositoryMetrics = { status: "available", source: "github-rest" };
  availability.issueMetrics = {
    status: maintainerIssueMetrics.status === "available" ? "available" : "partial",
    source: "github-search-rest",
    maintainerResponseSource: maintainerIssueMetrics.status
  };
  availability.pullRequestMetrics = {
    status: maintainerPullMetrics.status === "available" ? "available" : "partial",
    source: "github-search-rest",
    maintainerResponseSource: maintainerPullMetrics.status
  };
  availability.contributorMetrics = { status: "available", source: "github-rest" };
  availability.releaseMetrics = { status: "available", source: "github-rest" };
  availability.externalMetrics = externalMetricCollection.availability;

  return {
    schemaVersion: 1,
    repository: client.repository,
    collectedAt: context.collectedAt,
    reportDate: context.reportDate,
    period: context.period,
    sourceInfo: {
      githubRestBaseUrl: REST_BASE_URL,
      githubGraphqlPath: GRAPHQL_PATH,
      trafficRetentionDays: 14,
      maintainerAssociations: Array.from(MAINTAINER_ASSOCIATIONS)
    },
    repositoryMetrics: {
      defaultBranch: repo.default_branch,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      subscribers: repo.subscribers_count,
      watchers: repo.watchers_count,
      openIssues,
      openPullRequests,
      sizeKb: repo.size,
      pushedAt: repo.pushed_at,
      latestRelease,
      totalReleases: releases.length,
      contributorCount: contributors.length
    },
    issueMetrics: {
      newIssues,
      closedIssues,
      openIssues,
      goodFirstIssueOpen,
      helpWantedOpen,
      issueComments,
      mostActiveIssues: activeIssues.items.slice(0, config.maxHighlightedItems).map((issue) => ({
        number: issue.number,
        title: issue.title,
        url: issue.html_url,
        comments: issue.comments,
        updatedAt: issue.updated_at,
        labels: (issue.labels ?? []).map((label) => (typeof label === "string" ? label : label.name))
      })),
      openIssuesWithoutMaintainerResponse: maintainerIssueMetrics.openItemsWithoutMaintainerResponse,
      averageHoursToFirstMaintainerResponse: maintainerIssueMetrics.averageHoursToFirstMaintainerResponse,
      firstMaintainerResponseByAssociation: maintainerIssueMetrics.firstResponseByAssociation
    },
    pullRequestMetrics: {
      newPullRequests: createdPrSearch.total_count ?? createdPulls.length,
      mergedPullRequests: mergedPulls.length,
      closedWithoutMerge: closedPulls.filter((pull) => !pull.merged_at).length,
      openPullRequests,
      firstTimeContributors: new Set(firstTimeContributorLogins).size,
      repeatContributors: new Set(repeatContributorLogins).size,
      averageTimeToMergeHours:
        mergedHours.length > 0 ? Number((mergedHours.reduce((sum, value) => sum + value, 0) / mergedHours.length).toFixed(2)) : null,
      awaitingReview,
      openPullRequestsWithoutMaintainerResponse: maintainerPullMetrics.openItemsWithoutMaintainerResponse,
      averageHoursToFirstMaintainerResponse: maintainerPullMetrics.averageHoursToFirstMaintainerResponse,
      firstMaintainerResponseByAssociation: maintainerPullMetrics.firstResponseByAssociation,
      mostActivePullRequests: createdPulls
        .sort((left, right) => (right.comments ?? 0) - (left.comments ?? 0))
        .slice(0, config.maxHighlightedItems)
        .map((pull) => ({
          number: pull.number,
          title: pull.title,
          url: pull.html_url,
          comments: pull.comments,
          additions: pull.additions,
          deletions: pull.deletions,
          mergedAt: pull.merged_at
        }))
    },
    contributorMetrics: {
      currentContributorCount: contributors.length,
      commitsDuringPeriod: commits.length,
      newContributors: Array.from(acceptedContributorMap.values()).filter((entry) => entry.isFirstTime).length,
      repeatContributors: Array.from(acceptedContributorMap.values()).filter((entry) => !entry.isFirstTime).length,
      acceptedContributors: Array.from(acceptedContributorMap.values())
        .sort((left, right) => right.acceptedActivity - left.acceptedActivity)
        .slice(0, config.maxHighlightedItems),
      commitAuthors: Array.from(commitAuthors.values()).sort((left, right) => right.commits - left.commits).slice(0, config.maxHighlightedItems)
    },
    releaseMetrics: {
      releasesPublished: releases.filter((release) => release.published_at && release.published_at >= periodStart && release.published_at <= periodEnd).length,
      latestRelease,
      totalReleases: releases.length,
      daysSinceLastRelease: latestRelease ? daysBetween(latestRelease.publishedAt, context.collectedAt) : null,
      tagsCreated: null
    },
    discussionMetrics,
    trafficMetrics,
    externalMetrics: externalMetricCollection.metrics,
    availability,
    warnings,
    errors
  };
}

async function collectIssueCommentCount({ client, since }) {
  const comments = await client.listIssueComments({ since });
  if (!comments.length) {
    return 0;
  }
  const cache = new Map();
  let issueCommentCount = 0;
  for (const comment of comments) {
    const issueUrl = comment.issue_url;
    if (!issueUrl) {
      continue;
    }
    if (!cache.has(issueUrl)) {
      cache.set(issueUrl, client.getJson(issueUrl));
    }
    const issue = await cache.get(issueUrl);
    if (!issue.pull_request) {
      issueCommentCount += 1;
    }
  }
  return issueCommentCount;
}

async function collectMaintainerIssueMetrics({ client, warnings, openIssues, createdDuringPeriod }) {
  try {
    const analyzed = await analyzeMaintainerResponses({
      items: dedupeItemsByNumber([...openIssues, ...createdDuringPeriod]),
      loadEvents: async (item) => {
        const comments = await client.listCommentsForIssue(item.number);
        return comments.map((comment) => ({
          createdAt: comment.created_at,
          authorAssociation: comment.author_association,
          login: comment.user?.login ?? null
        }));
      }
    });
    return summarizeMaintainerResponseAnalysis(analyzed, {
      openNumbers: new Set(openIssues.map((item) => item.number)),
      createdDuringPeriodNumbers: new Set(createdDuringPeriod.map((item) => item.number))
    });
  } catch (error) {
    warnings.push(`Issue maintainer-response metrics unavailable: ${error.message}`);
    return createEmptyMaintainerResponseMetrics("unavailable");
  }
}

async function collectMaintainerPullMetrics({ client, warnings, openPulls, createdDuringPeriod }) {
  try {
    const analyzed = await analyzeMaintainerResponses({
      items: dedupeItemsByNumber([...openPulls, ...createdDuringPeriod]),
      loadEvents: async (item) => {
        const [issueComments, reviews, reviewComments] = await Promise.all([
          client.listCommentsForIssue(item.number),
          client.listPullReviews(item.number),
          client.listPullReviewComments(item.number)
        ]);
        return [
          ...issueComments.map((comment) => ({
            createdAt: comment.created_at,
            authorAssociation: comment.author_association,
            login: comment.user?.login ?? null
          })),
          ...reviews
            .filter((review) => review.state !== "PENDING")
            .map((review) => ({
              createdAt: review.submitted_at ?? review.created_at,
              authorAssociation: review.author_association,
              login: review.user?.login ?? null
            })),
          ...reviewComments.map((comment) => ({
            createdAt: comment.created_at,
            authorAssociation: comment.author_association,
            login: comment.user?.login ?? null
          }))
        ];
      }
    });
    return summarizeMaintainerResponseAnalysis(analyzed, {
      openNumbers: new Set(openPulls.map((item) => item.number)),
      createdDuringPeriodNumbers: new Set(createdDuringPeriod.map((item) => item.number))
    });
  } catch (error) {
    warnings.push(`Pull-request maintainer-response metrics unavailable: ${error.message}`);
    return createEmptyMaintainerResponseMetrics("unavailable");
  }
}

async function analyzeMaintainerResponses({ items, loadEvents }) {
  return Promise.all(
    items.map(async (item) => {
      const response = getFirstMaintainerResponse(item, await loadEvents(item));
      return {
        number: item.number,
        response
      };
    })
  );
}

export function isMaintainerAssociation(value) {
  return MAINTAINER_ASSOCIATIONS.has(normalizeAssociation(value));
}

export function getFirstMaintainerResponse(item, events) {
  const authorAssociation = normalizeAssociation(item.author_association);
  const authorLogin = item.user?.login ?? null;
  const createdAt = item.created_at;

  if (isMaintainerAssociation(authorAssociation)) {
    return {
      responded: true,
      authorIsMaintainer: true,
      firstResponseAt: createdAt,
      firstResponseAssociation: authorAssociation,
      hoursToFirstMaintainerResponse: 0
    };
  }

  const firstResponse = [...events]
    .filter((event) => event.createdAt && isMaintainerAssociation(event.authorAssociation))
    .filter((event) => !authorLogin || event.login !== authorLogin)
    .filter((event) => new Date(event.createdAt) >= new Date(createdAt))
    .sort((left, right) => new Date(left.createdAt) - new Date(right.createdAt))
    .at(0);

  if (!firstResponse) {
    return {
      responded: false,
      authorIsMaintainer: false,
      firstResponseAt: null,
      firstResponseAssociation: null,
      hoursToFirstMaintainerResponse: null
    };
  }

  return {
    responded: true,
    authorIsMaintainer: false,
    firstResponseAt: firstResponse.createdAt,
    firstResponseAssociation: normalizeAssociation(firstResponse.authorAssociation),
    hoursToFirstMaintainerResponse: hoursBetween(createdAt, firstResponse.createdAt)
  };
}

export function summarizeMaintainerResponseAnalysis(analysis, { openNumbers, createdDuringPeriodNumbers }) {
  const firstResponseByAssociation = {};
  const respondedCreatedDuringPeriod = [];
  let openItemsWithoutMaintainerResponse = 0;

  for (const item of analysis) {
    const isOpen = openNumbers.has(item.number);
    const createdDuringPeriod = createdDuringPeriodNumbers.has(item.number);
    const { response } = item;

    if (isOpen && !response.responded && !response.authorIsMaintainer) {
      openItemsWithoutMaintainerResponse += 1;
    }

    if (response.firstResponseAssociation) {
      firstResponseByAssociation[response.firstResponseAssociation] =
        (firstResponseByAssociation[response.firstResponseAssociation] ?? 0) + 1;
    }

    if (createdDuringPeriod && response.responded && !response.authorIsMaintainer && Number.isFinite(response.hoursToFirstMaintainerResponse)) {
      respondedCreatedDuringPeriod.push(response.hoursToFirstMaintainerResponse);
    }
  }

  return {
    status: "available",
    openItemsWithoutMaintainerResponse,
    averageHoursToFirstMaintainerResponse:
      respondedCreatedDuringPeriod.length > 0
        ? Number(
            (
              respondedCreatedDuringPeriod.reduce((sum, value) => sum + value, 0) / respondedCreatedDuringPeriod.length
            ).toFixed(2)
          )
        : null,
    firstResponseByAssociation
  };
}

function createEmptyMaintainerResponseMetrics(status) {
  return {
    status,
    openItemsWithoutMaintainerResponse: null,
    averageHoursToFirstMaintainerResponse: null,
    firstResponseByAssociation: {}
  };
}

async function collectDiscussionMetrics({ client, config, context, warnings, availability }) {
  if (!config.enableDiscussions) {
    availability.discussionMetrics = { status: "disabled", reason: "Discussions disabled in config." };
    return {
      status: "disabled",
      newDiscussions: null,
      newComments: null,
      answeredDiscussions: null,
      unansweredQuestions: null,
      mostActiveDiscussions: []
    };
  }

  try {
    const data = await client.graphql(
      `
        query GrowthDiscussions($owner: String!, $repo: String!, $cursor: String) {
          repository(owner: $owner, name: $repo) {
            discussions(first: 50, after: $cursor, orderBy: { field: UPDATED_AT, direction: DESC }) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                number
                title
                url
                createdAt
                isAnswered
                category {
                  isAnswerable
                  name
                }
                comments(first: 50) {
                  totalCount
                  nodes {
                    createdAt
                  }
                }
              }
            }
          }
        }
      `,
      {
        owner: client.owner,
        repo: client.repo,
        cursor: null
      }
    );

    const discussions = data.repository?.discussions?.nodes ?? [];
    const start = context.period.start;
    const end = context.period.end;
    const newDiscussions = discussions.filter((discussion) => discussion.createdAt >= start && discussion.createdAt <= end).length;
    const newComments = discussions.reduce(
      (sum, discussion) => sum + discussion.comments.nodes.filter((comment) => comment.createdAt >= start && comment.createdAt <= end).length,
      0
    );
    const answeredDiscussions = discussions.filter((discussion) => discussion.isAnswered).length;
    const unansweredQuestions = discussions.filter((discussion) => discussion.category?.isAnswerable && !discussion.isAnswered).length;
    availability.discussionMetrics = { status: "available", source: "github-graphql" };

    return {
      newDiscussions,
      newComments,
      answeredDiscussions,
      unansweredQuestions,
      mostActiveDiscussions: discussions
        .sort((left, right) => (right.comments.totalCount ?? 0) - (left.comments.totalCount ?? 0))
        .slice(0, config.maxHighlightedItems)
        .map((discussion) => ({
          number: discussion.number,
          title: discussion.title,
          url: discussion.url,
          comments: discussion.comments.totalCount,
          isAnswered: discussion.isAnswered
        }))
    };
  } catch (error) {
    warnings.push(`Discussion metrics unavailable: ${error.message}`);
    availability.discussionMetrics = { status: "unavailable", reason: error.message };
    return {
      status: "unavailable",
      newDiscussions: null,
      newComments: null,
      answeredDiscussions: null,
      unansweredQuestions: null,
      mostActiveDiscussions: []
    };
  }
}

async function collectTrafficMetrics({ client, config, warnings, availability }) {
  if (!config.enableGitHubTraffic) {
    availability.trafficMetrics = { status: "disabled", reason: "GitHub traffic disabled in config." };
    return {
      status: "disabled",
      views: null,
      clones: null,
      topReferrers: [],
      topPaths: []
    };
  }

  try {
    const [views, clones, referrers, paths] = await Promise.all([
      client.getTrafficViews(),
      client.getTrafficClones(),
      client.getTrafficReferrers(),
      client.getTrafficPaths()
    ]);

    availability.trafficMetrics = {
      status: "available",
      source: "github-traffic",
      retentionDays: 14,
      uniqueCountsApproximate: true
    };
    warnings.push("GitHub traffic unique counts are approximated from daily uniques because the API does not expose exact distinct users for arbitrary weekly windows.");

    return {
      windowDays: 14,
      views: {
        count: views.count,
        uniqueDailySumApproximation: sumDailyUniques(views.views)
      },
      clones: {
        count: clones.count,
        uniqueDailySumApproximation: sumDailyUniques(clones.clones)
      },
      topReferrers: referrers.map((item) => ({
        referrer: item.referrer,
        count: item.count,
        uniques: item.uniques
      })),
      topPaths: paths.map((item) => ({
        path: item.path,
        title: item.title,
        count: item.count,
        uniques: item.uniques
      }))
    };
  } catch (error) {
    warnings.push(`Traffic metrics unavailable: ${error.message}`);
    availability.trafficMetrics = { status: "unavailable", reason: error.message, retentionDays: 14 };
    return {
      status: "unavailable",
      views: null,
      clones: null,
      topReferrers: [],
      topPaths: []
    };
  }
}

export function shouldRetry(response) {
  return [408, 409, 429, 500, 502, 503, 504].includes(response.status);
}

export function getRetryDelay(response, attempt) {
  const retryAfter = Number(response.headers.get("retry-after"));
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return retryAfter * 1000;
  }
  const remaining = response.headers.get("x-ratelimit-remaining");
  const reset = Number(response.headers.get("x-ratelimit-reset"));
  if (remaining === "0" && Number.isFinite(reset)) {
    const delayMs = Math.max(reset * 1000 - Date.now(), 1_000);
    return Math.min(delayMs, 60_000);
  }
  return (attempt + 1) * 2_000;
}

export function formatGitHubError(response, payload) {
  const message = payload?.message ?? response.statusText;
  const documentationUrl = payload?.documentation_url ? ` (${payload.documentation_url})` : "";
  return `GitHub API ${response.status}: ${message}${documentationUrl}`;
}

async function safeReadJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function sumDailyUniques(rows = []) {
  return rows.reduce((sum, item) => sum + (item.uniques ?? 0), 0);
}

function dedupeItemsByNumber(items) {
  return Array.from(new Map(items.filter(Boolean).map((item) => [item.number, item])).values());
}

function normalizeAssociation(value) {
  return String(value ?? "NONE").trim().toUpperCase();
}

function hoursBetween(from, to) {
  return Number((((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60))).toFixed(2));
}

function minTimestamp(left, right) {
  if (!left) return right;
  if (!right) return left;
  return new Date(left) <= new Date(right) ? left : right;
}

function daysBetween(from, to) {
  return Math.floor((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60 * 24));
}
