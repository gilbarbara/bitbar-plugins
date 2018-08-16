#!/usr/bin/env /usr/local/bin/node
const https = require('https');

/* EDIT HERE */
const BASE_URL = '';
const USER = '';
const API_KEY = '';
const PROJECT_KEY = '';
const LIMIT = 10;
const SHOW_TIMETRACK = true;
/* DON'T EDIT BELOW */

const AUTH = Buffer.from(`${USER}:${API_KEY}`).toString('base64');
const BROWSE_URL = `https://${BASE_URL}/browse/`;
const ICON = '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IFF1YXJ0eiBQREZDb250ZXh0KQplbmRvYmoKMTIgMCBvYmoKKEQ6MjAxODA4MTYwMDI2MjJaMDAnMDAnKQplbmRvYmoKMSAwIG9iago8PCAvUHJvZHVjZXIgMTEgMCBSIC9DcmVhdGlvbkRhdGUgMTIgMCBSIC9Nb2REYXRlIDEyIDAgUiA+PgplbmRvYmoKeHJlZgowIDEzCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMzY2OSAwMDAwMCBuIAowMDAwMDAwNTI3IDAwMDAwIG4gCjAwMDAwMDM0NDMgMDAwMDAgbiAKMDAwMDAwMDAyMiAwMDAwMCBuIAowMDAwMDAwNTA4IDAwMDAwIG4gCjAwMDAwMDA2MDcgMDAwMDAgbiAKMDAwMDAwMzQwOCAwMDAwMCBuIAowMDAwMDAwNjc1IDAwMDAwIG4gCjAwMDAwMDMzODggMDAwMDAgbiAKMDAwMDAwMzUyNCAwMDAwMCBuIAowMDAwMDAzNTc0IDAwMDAwIG4gCjAwMDAwMDM2MjcgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAxMyAvUm9vdCAxMCAwIFIgL0luZm8gMSAwIFIgL0lEIFsgPDY4NjJkZmMxZDVhNzFmNDFmYmIwM2RlMmU3NmM1YWNhPgo8Njg2MmRmYzFkNWE3MWY0MWZiYjAzZGUyZTc2YzVhY2E+IF0gPj4Kc3RhcnR4cmVmCjM3NDQKJSVFT0YK';
const PRIORITIES = {
  Highest: '#e50004',
  High: '#e85800',
  Medium: '#e88900',
  Low: '#e8b700',
  Lowest: '#e8e500',
};
const COLORS = {
  Task: '#0090e6',
  Feature: '#16b307',
  Story: '#16b307',
  Epic: '#9200df',
  Bug: '#e2000c',
};
const ICONS = {
  Task: '✔',
  Feature: '★',
  Story: '★',
  Epic: '✦',
  Bug: '●',
};

function request(options = {}) {
  const OPTIONS = {
    hostname: BASE_URL,
    port: 443,
    path: options.path ? options.path.replace(/ /g, '%20') : '/',
    method: options.method || 'GET',
    headers: {
      Authorization: `Basic ${AUTH}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(OPTIONS, (response) => {
      const { headers, statusCode } = response;

      if (statusCode < 200 || statusCode > 299) {
        reject(new Error(`Request failed - status code: ${response.statusCode}`));
      }

      const isJSON = headers['content-type'].includes('application/json');

      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', chunk => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => {
        const content = body.join('');

        resolve(isJSON ? JSON.parse(content) : content);
      });
    });

    // handle connection errors of the request
    req.on('error', err => reject(err));
    req.end();
  });
}

function trimString(str, n = 72) {
  return (str.length > n) ? `${str.substr(0, n - 1)}…` : str;
}

function formatIssue(issue) {
  const {
    issuetype,
    priority,
    status,
    summary,
    timetracking,
  } = issue.fields;

  return [
    `${trimString(summary)} | href=${BROWSE_URL}${issue.key} color=#444`,
    `${ICONS[issuetype.name]} ${issuetype.name} ‣ ${status.name} | color=${COLORS[issuetype.name]}`,
    SHOW_TIMETRACK && timetracking.originalEstimate ? `▲ ${timetracking.originalEstimate}` : '',
  ]
    .filter(d => !!d)
    .join('\n');
}

const login = () => request({ path: '/rest/auth/1/session' });

const getProject = () => request({ path: `/rest/api/2/project/${PROJECT_KEY}` });

const getItems = () => {
  const query = [
    'assignee in(currentUser())',
    'status not in (created, done)',
    `project=${PROJECT_KEY}`,
  ].join(' AND ');
  const fields = ['summary', 'priority', 'issuetype', 'status', 'timetracking', 'issuetype'];

  return request({ path: `/rest/api/2/search?jql=${query}&fields=${fields.join(',')}&maxResults=${LIMIT}` });
};

login()
  .then(() => Promise.all([getProject(), getItems()]))
  .then(([project, items]) => {
    const projectUrl = `${BROWSE_URL}${project.key}`;
    const issues = items.issues.map(formatIssue);
    const output = issues.length ? issues.join('\n---\n') : 'Nothing to show | color=gray';

    console.log(`|image=${ICON}\n---\n${project.name} @ Jira | href=${projectUrl}\n---\n${output}`);
  })
  .catch(err => console.error(err));
