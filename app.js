const linkInfoElement = document.querySelector('#link-info');

const params = new URLSearchParams(window.location.search);

let url = params.get('url');

if (url) {
  url = decodeURIComponent(url);
  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.textContent = url;
  linkInfoElement.appendChild(linkElement);
  embedInfo(url);
} else {
  linkInfoElement.textContent = 'No link specified.';
}

async function embedInfo(url) {
  const response = await fetch(`https://embtr.now.sh/scrape?url=` + encodeURIComponent(url));
  const json = await response.json();
  console.log(json);
  const preview = document.createElement('div');
  preview.className = 'preview';
  const inner = document.createElement('div');
  inner.className = 'preview-inner';
  const title = document.createElement('p');
  title.textContent = json.title;
  inner.appendChild(title);
  if (json.image) {
    const image = document.createElement('img');
    image.src = json.image;
    inner.appendChild(image);
  }
  const description = document.createElement('p');
  description.textContent = json.description;
  inner.appendChild(description);
  preview.appendChild(inner);
  linkInfoElement.appendChild(preview);
}