#!/usr/bin/env /usr/local/bin/node
const https = require('https');

/* EDIT HERE */
const API_TOKEN = '';
/* DON'T EDIT BELOW */
// <bitbar.title>Github Notifications</bitbar.title>
// <bitbar.version>v1.0</bitbar.version>
// <bitbar.author>Gil Barbara</bitbar.author>
// <bitbar.author.github>gilbarbara</bitbar.author.github>
// <bitbar.desc>List notifications.</bitbar.desc>
// <bitbar.dependencies>node</bitbar.dependencies>
// <bitbar.abouturl>https://github.com/gilbarbara/bitbar-plugins</bitbar.abouturl>
const BASE_URL = 'api.github.com';
const ICON = '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ZWQgOCAwIFIgXQplbmRvYmoKMyAwIG9iago8PCAvVHlwZSAvUGFnZXMgL01lZGlhQm94IFswIDAgMTYgMTZdIC9Db3VudCAxIC9LaWRzIFsgMiAwIFIgXSA+PgplbmRvYmoKMTAgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cgL1BhZ2VzIDMgMCBSID4+CmVuZG9iagoxMSAwIG9iagooTWFjIE9TIFggMTAuMTMuNiBRdWFydHogUERGQ29udGV4dCkKZW5kb2JqCjEyIDAgb2JqCihEOjIwMTgwODExMjIzMjU0WjAwJzAwJykKZW5kb2JqCjEgMCBvYmoKPDwgL1Byb2R1Y2VyIDExIDAgUiAvQ3JlYXRpb25EYXRlIDEyIDAgUiAvTW9kRGF0ZSAxMiAwIFIgPj4KZW5kb2JqCnhyZWYKMCAxMwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDQ3NDQgMDAwMDAgbiAKMDAwMDAwMTYwMiAwMDAwMCBuIAowMDAwMDA0NTE4IDAwMDAwIG4gCjAwMDAwMDAwMjIgMDAwMDAgbiAKMDAwMDAwMTU4MiAwMDAwMCBuIAowMDAwMDAxNjgyIDAwMDAwIG4gCjAwMDAwMDQ0ODMgMDAwMDAgbiAKMDAwMDAwMTc1MCAwMDAwMCBuIAowMDAwMDA0NDYzIDAwMDAwIG4gCjAwMDAwMDQ1OTkgMDAwMDAgbiAKMDAwMDAwNDY0OSAwMDAwMCBuIAowMDAwMDA0NzAyIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgMTMgL1Jvb3QgMTAgMCBSIC9JbmZvIDEgMCBSIC9JRCBbIDw4YmRjYjYxNzEwOThkYWFjYzhkYTBlMDc0OGM3MDA5ZD4KPDhiZGNiNjE3MTA5OGRhYWNjOGRhMGUwNzQ4YzcwMDlkPiBdID4+CnN0YXJ0eHJlZgo0ODE5CiUlRU9GCg==';
const RELOAD_ICON = 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAmElEQVR4AY3SJdYCYRhA4V+BRGY5rAF3ZwvkiSyANLugYgUtOJsg4s7LxV3uOU8a+fTrom9EUMEAfZQRwDEFuwxIQ9CEetCBIIk4BF/fSKMPL26LYgHZoQgEXjxKgQCgCpqfvQwaQMVtOhhv3X7wURU08apvxGB5v2giFwTmT7bVigly+H11cAnUIChAD3p+NbrIwotv7NoAffg2NR6lsPIAAAAASUVORK5CYII=';

function request(options = {}) {
  const OPTIONS = {
    hostname: BASE_URL,
    path: options.path || '/',
    port: 443,
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'github-notifications-bitbar-plugin',
      ...options.headers,
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
          reject(new Error(`Request failed [${response.statusCode}] - ${data}`));
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

function formatTitle({ subject, unread }) {
  const url = subject.url.replace('api.github.com/repos', 'github.com');

  return `${subject.title} | href=${url} length=48 color=${unread ? '#4078C0' : 'black'}`;
}

function formatInfo({ repository, updated_at: updatedAt }) {
  return `${repository.full_name} - ${timeSince(updatedAt)} ago | size=12`;
}

function formatNotification(data) {
  return [
    formatTitle(data),
    formatInfo(data),
  ].join('\n');
}

function handleResponse(body) {
  const content = body.map(formatNotification).join('\n---\n');
  const output = [
    `|image=${ICON}`,
    content,
    `RELOAD | image=${RELOAD_ICON} refresh=true`,
  ];
  console.log(output.join('\n---\n'));
}

const getNotifications = () => request({
  path: '/notifications?all=true&per_page=10',
});

getNotifications()
  .then(handleResponse)
  .catch(err => console.log(err.toString()));
