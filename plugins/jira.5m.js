#!/usr/bin/env /usr/local/bin/node
const https = require('https');

/* EDIT HERE */
/** Domain only, no protocol. Eg. company.atlassian.net */
const BASE_URL = '';
const USER = '';
const API_TOKEN = '';
const PROJECT_KEY = '';
const LIMIT = 10;
const IGNORED_STATUSES = ['created', 'done', 'resolved', '"Code Review"'];
const SHOW_TIMETRACK = true;
const SHOW_ALL_ISSUES = false;
/* DON'T EDIT BELOW */
// <bitbar.title>Jira</bitbar.title>
// <bitbar.version>v1.0</bitbar.version>
// <bitbar.author>Gil Barbara</bitbar.author>
// <bitbar.author.github>gilbarbara</bitbar.author.github>
// <bitbar.desc>List tickets.</bitbar.desc>
// <bitbar.dependencies>node</bitbar.dependencies>
// <bitbar.abouturl>https://github.com/gilbarbara/bitbar-plugins</bitbar.abouturl>
const AUTH = Buffer.from(`${USER}:${API_TOKEN}`).toString('base64');
const BROWSE_URL = `https://${BASE_URL}/browse/`;
const ICON = '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IFF1YXJ0eiBQREZDb250ZXh0KQplbmRvYmoKMTIgMCBvYmoKKEQ6MjAxODA4MTYwMDI2MjJaMDAnMDAnKQplbmRvYmoKMSAwIG9iago8PCAvUHJvZHVjZXIgMTEgMCBSIC9DcmVhdGlvbkRhdGUgMTIgMCBSIC9Nb2REYXRlIDEyIDAgUiA+PgplbmRvYmoKeHJlZgowIDEzCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMzY2OSAwMDAwMCBuIAowMDAwMDAwNTI3IDAwMDAwIG4gCjAwMDAwMDM0NDMgMDAwMDAgbiAKMDAwMDAwMDAyMiAwMDAwMCBuIAowMDAwMDAwNTA4IDAwMDAwIG4gCjAwMDAwMDA2MDcgMDAwMDAgbiAKMDAwMDAwMzQwOCAwMDAwMCBuIAowMDAwMDAwNjc1IDAwMDAwIG4gCjAwMDAwMDMzODggMDAwMDAgbiAKMDAwMDAwMzUyNCAwMDAwMCBuIAowMDAwMDAzNTc0IDAwMDAwIG4gCjAwMDAwMDM2MjcgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAxMyAvUm9vdCAxMCAwIFIgL0luZm8gMSAwIFIgL0lEIFsgPDY4NjJkZmMxZDVhNzFmNDFmYmIwM2RlMmU3NmM1YWNhPgo8Njg2MmRmYzFkNWE3MWY0MWZiYjAzZGUyZTc2YzVhY2E+IF0gPj4Kc3RhcnR4cmVmCjM3NDQKJSVFT0YK';
const ICONS = {
  Bug: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVR4AWN47mnt+dTT6jEQ/ycRPwbpZSBPM8IQBhCDEkw7A56He/1/21IFwiA2aQa8qS/9//fL5/9QAGKDxAgYgLAZWTOyISA5ggaAnYwDgOQoNoBiL1AUiPSJRvqnRIozE8XZGQBnKZxDdHA1vgAAAABJRU5ErkJggg==',
  Epic: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAk0lEQVR4AWOYHPDYc6L/48cT/B79JwWD9ID0MiBrJscQBhCDEozTgMkhj//vn/mOfAMOznn3HwhINQBh+5f3f8g34OBcoO1QMD/tGRQ//T/BnwgDpsBtxwRbO18TNACsCBv4CjQUaDhBA0DOBDkX7nQYODT3PQmxgMDItpNpAMJ28gzYP+MdKFrxG0AJpjgzUZydAYNC27BT2FzcAAAAAElFTkSuQmCC',
  Feature: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAHlBMVEVptklotUhotEeazYV0ulb9/v19vmD///+Px3d1ulYbdfwGAAAAAnRSTlNJ424rirYAAABBSURBVHgBY2BUAgMBBiEIQ5FBCQpADGUjKMM1BMpIL4Mw3NorUkAM5fDy8lIjZIbSNKgUQrHS1BBUA6EAbincGQCn+xff/fpqagAAAABJRU5ErkJggg==',
  Story: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAi0lEQVR4AWNI3WvvmbLL9nHyLpv/pGCQHpBeBmTN5BjCAGJQgjEMyNjj9H/1ren/9zxcjYxBYiA5wgbMvtT0HwcAyRE2YOn1flz6QXIjzoAvvz6BMHkG/Pzz43/LiTQQBrFJM+Dvv7//p16ogomB2CAx4gyoOhIJ1FCNrhAkBpLDbgAlmOLMRHF2BgAy2aynfVwqNAAAAABJRU5ErkJggg==',
  'Sub-task': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEVLrulNr+pkuetLruhiuOpZtOn///+PzPD9/v7L5/jJ5vhNruii1fPY7fqX0PHh8fq/4vbw+PxVsukX2Ns6AAAAAnRSTlPjSQzAlCMAAABjSURBVHjaZc/ZFoAgCEVRQ8R56v8/NqSVVp4n7n5DHUq/4il7JTsiAJhHeGfinJ2AdPKRwgSgcRT/AWy1+2AXNBo5I2BcKpUkENA2+P4Cyf8h3IATrBs7RwHJAADy1ttz2/sXXRcEbjp7uW8AAAAASUVORK5CYII=',
  Task: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyElEQVR4AWPwXf/K03vdy8fea1/8JwWD9ID0MiBrJscQBhCDEkw/A+Zc+vT/zbc//6sOvSPdgNbj7//DwLTzH0kzIHPX6//ffv8Fa77+5ud//3V4vBC5+eX/+Zc//U/d8RrMD9v08v/Tz7/Bmt99//M/dusrvGEA1gwCn37+/Z+3983/089/gPm//v77X7z/LcFABNkM1gwCf4CaYGDyuY/Ex0LOnjdgQ2Bgx72vpEQjwpDHn37/P/b0OzTQcOOBT4kUZyaKszMAV1H50t3xh/4AAAAASUVORK5CYII=',
  'Technical Debt': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5ElEQVR4AWJI3WvvmbLL9nHyLpv/pGCQHpBeBmTN5BjCAGJQgvEaACidGnQqjuLwo+U5PUB2Ux6zjSHbGhuy7bq2bfu7O+Md/zqYf/i0/N+HDcEouwZDb/XQexVwBq04ka+j+jydfoOe5wrE4lHovHK8m66gcAnQdJNPvwFZm5yZrzZ2HDTe5MEaMCCeiOPbfI+u5zLmHNRf5mBHNAVbwIRg1I/OpxL6DVI/KQRAmtFvsPDXBW/EDYnjF46gBfFEDB1PxfQbtNwW4ky1D0/YAa1Hxo4D8o8lc2QbGipw+NzDxDXOSR+lejoP7BDYAAAAAElFTkSuQmCC',
};
// eslint-disable-next-line no-unused-vars
const COLORS = {
  Bug: '#e2000c',
  Epic: '#9200df',
  Feature: '#16b307',
  Story: '#16b307',
  'Sub-task': '#0090e6',
  Task: '#0090e6',
};
const RELOAD_ICON = 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAmElEQVR4AY3SJdYCYRhA4V+BRGY5rAF3ZwvkiSyANLugYgUtOJsg4s7LxV3uOU8a+fTrom9EUMEAfZQRwDEFuwxIQ9CEetCBIIk4BF/fSKMPL26LYgHZoQgEXjxKgQCgCpqfvQwaQMVtOhhv3X7wURU08apvxGB5v2giFwTmT7bVigly+H11cAnUIChAD3p+NbrIwotv7NoAffg2NR6lsPIAAAAASUVORK5CYII=';

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

      const isJSON = headers['content-type'].includes('application/json');

      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', chunk => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => {
        const content = body.join('');
        const data = isJSON ? JSON.parse(content) : content;

        if (statusCode < 200 || statusCode > 299) {
          const { errorMessages } = data;
          const error = errorMessages && Array.isArray(errorMessages) ? ` -- ${errorMessages[0]}` : '';

          reject(new Error(`Request failed [${response.statusCode}]${error}`));
          return;
        }

        resolve(data);
      });
    });

    // handle connection errors of the request
    req.on('error', err => reject(err));
    req.end();
  });
}

function trimString(str, n = 48) {
  return (str.length > n) ? `${str.substr(0, n - 1)}…` : str;
}

function formatIssue(issue) {
  const {
    assignee,
    issuetype,
    parent,
    status,
    summary,
    timetracking,
  } = issue.fields;
  const assignment = ` (${assignee ? assignee.displayName : 'unassigned'})`;

  return [
    `[${issue.key}] ${trimString(summary)} | href=${BROWSE_URL}${issue.key}  image=${ICONS[issuetype.name]} color=#555`,
    parent && `▲ [${parent.key}] ${trimString(parent.fields.summary)}  | href=${BROWSE_URL}${parent.key} color=gray`,
    `${status.name}${SHOW_ALL_ISSUES ? assignment : ''} | color=#999 font=Monaco`,
    SHOW_TIMETRACK && timetracking.originalEstimate ? `▶ ${timetracking.originalEstimate}` : '',
  ]
    .filter(d => !!d)
    .join('\n');
}

const login = () => request({ path: '/rest/auth/1/session' });

const getProject = () => request({ path: `/rest/api/2/project/${PROJECT_KEY}` });

const getItems = () => {
  const query = [
    !SHOW_ALL_ISSUES && 'assignee in(currentUser())',
    `status not in (${IGNORED_STATUSES.join(', ')})`,
    `project=${PROJECT_KEY}`,
  ]
    .filter(d => !!d)
    .join(' AND ');
  const fields = ['summary', 'issuetype', 'status', 'timetracking', 'assignee', 'parent'];

  return request({ path: `/rest/api/2/search?jql=${query}&fields=${fields.join(',')}&maxResults=${LIMIT}` });
};

login()
  .then(() => Promise.all([getProject(), getItems()]))
  .then(([project, items]) => {
    const projectUrl = `${BROWSE_URL}${project.key}`;
    const issues = items.issues.map(formatIssue);
    const content = issues.length ? issues.join('\n---\n') : 'Nothing to show | color=gray';

    const output = [
      `|image=${ICON}`,
      `${project.name} @ Jira | href=${projectUrl}`,
      content,
      `RELOAD | image=${RELOAD_ICON} refresh=true`,
    ];

    console.log(output.join('\n---\n'));
  })
  .catch(err => console.error(err.toString()));
