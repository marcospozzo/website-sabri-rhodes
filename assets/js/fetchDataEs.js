(async function populateData() {
  const embedUrl = "https://www.youtube.com/embed/";
  try {
    const response1 = await fetch(
      "https://opensheet.elk.sh/1zphaLXMRv2KyaVh-GfaGx0F3UHR6QK2iq-5aqiioxcA/main-es"
    );
    const main = await response1.json();

    // bio
    const bio = document.getElementById("bio-p");
    bio.innerText = main[0].bio;

    // news

    const newsTitle = document.getElementById("news-title");
    newsTitle.innerHTML = main[0].news;

    const newsDescription = document.getElementById("news-description");
    newsDescription.innerHTML = main[1].news;

    // matches any youtube video id
    const regex1 =
      /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([\w-]{11})(?=[^\w-]|$)(?![?&]list=)/;

    // matches the id from a google drive url
    const regex2 = /\/(?:d|file)\/([\w-]{7,})(?:\/|$)/;

    const newsMedia = document.getElementById("news-media");
    const urlNews = main[2].news;

    if (urlNews.includes("youtu")) {
      const iFrame = document.createElement("iframe");
      iFrame.setAttribute("frameborder", "0");
      iFrame.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      );
      iFrame.setAttribute("allowfullscreen", "true");
      const matchVid = urlNews.match(regex1);

      iFrame.setAttribute("src", `${embedUrl}${matchVid[1]}`);
      iFrame.setAttribute("class", "youtube-iframe-news");

      newsMedia.appendChild(iFrame);
    }
    if (urlNews.includes("spotify")) {
      const stringToHTML = (str) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, "text/html");
        return doc.body.firstChild;
      };
      const spotifyIframe = stringToHTML(urlNews);
      spotifyIframe.setAttribute("class", "news-spotify-iframe");
      newsMedia.appendChild(spotifyIframe);
    } else {
      const a = document.createElement("a");
      a.setAttribute("href", main[3].news);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
      a.setAttribute("id", "a-tag-news");

      const img = document.createElement("img");
      const matchImg = urlNews.match(regex2);
      img.setAttribute(
        "src",
        `https://drive.google.com/uc?export=view&id=${matchImg[1]}`
      );
      a.appendChild(img);
      newsMedia.appendChild(a);
    }

    // sobre mi
    const sobreMi = document.getElementById("sobre-mi-p");
    sobreMi.innerText = main[0].sobreMi;

    // que hago
    const queHago = document.getElementById("que-hago-p");
    queHago.innerText = main[0].queHago;

    // gallery
    const response2 = await fetch(
      "https://opensheet.elk.sh/1zphaLXMRv2KyaVh-GfaGx0F3UHR6QK2iq-5aqiioxcA/gallery-es"
    );
    const gallery = await response2.json();

    for (let index = 0; index < 6; index++) {
      const article = document.getElementById(`media${index + 1}`);

      if (gallery[index].url.includes("youtu")) {
        const urlVideo = gallery[index].url;
        const matchVideo = urlVideo.match(regex1);
        const iFrame = document.createElement("iframe");
        iFrame.setAttribute("frameborder", "0");
        iFrame.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        iFrame.setAttribute("allowfullscreen", "true");
        iFrame.setAttribute("src", `${embedUrl}${matchVideo[1]}`);
        iFrame.setAttribute("class", "gallery-iframe");
        article.appendChild(iFrame);
      } else {
        const urlImage = gallery[index].url;
        const urlImageThumb = gallery[index].thumbUrl;
        const imageId = urlImage.match(regex2);
        const imageIdThumb = urlImageThumb.match(regex2);
        const a = document.createElement("a");
        a.setAttribute("class", "image fit");
        a.setAttribute(
          "href",
          `https://drive.google.com/uc?export=view&id=${imageId[1]}`
        );

        const img = document.createElement("img");
        img.setAttribute(
          "src",
          `https://drive.google.com/uc?export=view&id=${imageIdThumb[1]}`
        );
        img.setAttribute("title", gallery[index].title);
        img.setAttribute("alt", gallery[index].title);

        a.appendChild(img);
        article.appendChild(a);
      }
    }
  } catch (error) {
    console.error(error);
  }
})();
