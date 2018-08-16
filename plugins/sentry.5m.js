#!/usr/bin/env /usr/local/bin/node
const https = require('https');

/* EDIT HERE */
const AUTH_TOKEN = '';
const ORGANIZATION = '';
const PROJECT = '';
const ISSUE_COUNT = 5;
/* DON'T EDIT BELOW */

const BASE_URL = 'sentry.io';
const PROJECT_URL = `https://sentry.io/${ORGANIZATION}/${PROJECT}`;
const TITLE = [`${ORGANIZATION}/${PROJECT}`, '@', 'Sentry'].join(' ');
const ICON = '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wo2SxrHjccdv/eD1Q3sTq+lQM6O5+AQ4ITnx4sf4H++eDDzZeYp9qukn/Z/2ttBailqh1tzWibakNml7THvf6YDTnR3OHS0/m/989Iz2mZqzymdLz5HOFZybOZ93fvJCxoXxi4kXhzpXdD66tOTSna6wrt7LgZevXvG5cqnbvfv8VZerZ645XTt9nX297Yb9jdYeu56WX+x+aem172296XCz/ZbjrY6+BX3n+l37L972un3ljv+dGwOLBvruLr57/17cPel93v3RB6kPXj/Mejj9aP1j7OOiJwpPKp6qP6391fjXZqm99Oyg12DPs4hnj4a4Qy//lfmvT8MFz6nPK0a0RupHrUfPjPmM3Xqx9MXwy4yX0+OFvyn+tveV0auffnf7vWdiycTwa9HrmT9K3qi+OfrW9m3nZOjk03dp76anit6rvj/2gf2h+2P0x5Hp7E/4T5WfjT93fAn88ngmbWbm3/eE8/sKZW5kc3RyZWFtCmVuZG9iago5IDAgb2JqCjI2MTIKZW5kb2JqCjcgMCBvYmoKWyAvSUNDQmFzZWQgOCAwIFIgXQplbmRvYmoKMyAwIG9iago8PCAvVHlwZSAvUGFnZXMgL01lZGlhQm94IFswIDAgMTYgMTVdIC9Db3VudCAxIC9LaWRzIFsgMiAwIFIgXSA+PgplbmRvYmoKMTAgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cgL1BhZ2VzIDMgMCBSID4+CmVuZG9iagoxMSAwIG9iagooTWFjIE9TIFggMTAuMTMuNiBRdWFydHogUERGQ29udGV4dCkKZW5kb2JqCjEyIDAgb2JqCihEOjIwMTgwODExMTYyMTIxWjAwJzAwJykKZW5kb2JqCjEgMCBvYmoKPDwgL1Byb2R1Y2VyIDExIDAgUiAvQ3JlYXRpb25EYXRlIDEyIDAgUiAvTW9kRGF0ZSAxMiAwIFIgPj4KZW5kb2JqCnhyZWYKMCAxMwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDQyNTggMDAwMDAgbiAKMDAwMDAwMTExNiAwMDAwMCBuIAowMDAwMDA0MDMyIDAwMDAwIG4gCjAwMDAwMDAwMjIgMDAwMDAgbiAKMDAwMDAwMTA5NiAwMDAwMCBuIAowMDAwMDAxMTk2IDAwMDAwIG4gCjAwMDAwMDM5OTcgMDAwMDAgbiAKMDAwMDAwMTI2NCAwMDAwMCBuIAowMDAwMDAzOTc3IDAwMDAwIG4gCjAwMDAwMDQxMTMgMDAwMDAgbiAKMDAwMDAwNDE2MyAwMDAwMCBuIAowMDAwMDA0MjE2IDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgMTMgL1Jvb3QgMTAgMCBSIC9JbmZvIDEgMCBSIC9JRCBbIDw5YTkwNjRhZjYwNGZjMDE4MmFhZjg4OGZlNTI4NGUwMD4KPDlhOTA2NGFmNjA0ZmMwMTgyYWFmODg4ZmU1Mjg0ZTAwPiBdID4+CnN0YXJ0eHJlZgo0MzMzCiUlRU9GCg==';

function request(options = {}) {
  const OPTIONS = {
    hostname: BASE_URL,
    path: `/api/0/projects/${ORGANIZATION}/${PROJECT}/issues/?query=is%3Aunresolved&limit=${ISSUE_COUNT}&sort=date&statsPeriod=24h`,
    port: 443,
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
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

function statusColor(issue) {
  const { assignedTo, status } = issue;
  const isAssigned = assignedTo !== null;
  if (status === 'resolved' || status === 'muted') {
    return 'green';
  }

  if (status === 'unresolved' && isAssigned) {
    return 'orange';
  }

  return 'red';
}

function timeSince(dateString) {
  const date = new Date(dateString);

  const seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  }
  else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    }
    else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      }
      else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = 'hour';
        }
        else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = 'minute';
          }
          else {
            interval = seconds;
            intervalType = 'second';
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return `${interval} ${intervalType}`;
}

function trimString(str, n = 72) {
  return (str.length > n) ? `${str.substr(0, n - 1)}…` : str;
}

function formatTitle(issue) {
  return `${trimString(issue.title)} | href=${issue.permalink} color=${statusColor(issue)}`;
}

function formatCount(count) {
  const str = (count === 1) ? 'occurrence' : 'occurrences';
  return `${count} ${str} | size=10`;
}

function formatTimes(issue) {
  const lastSeen = `${timeSince(issue.lastSeen)} ago`;
  const firstSeen = `${timeSince(issue.firstSeen)} old`;
  return `${lastSeen} - ${firstSeen} | size=12`;
}

function formatIssue(issue) {
  return [
    formatTitle(issue),
    formatTimes(issue),
    formatCount(issue.count),
  ].join('\n');
}

function handleResponse(body) {
  const output = body.map(formatIssue).join('\n---\n');
  console.log(`|image=${ICON}\n---\n${TITLE} | href=${PROJECT_URL}\n---\n${output}`);
}

request()
  .then(d => handleResponse(JSON.parse(d)))
  .catch(err => console.log(err.toString()));
