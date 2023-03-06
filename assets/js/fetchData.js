(async function populateData() {
  const embedUrl = "https://www.youtube.com/embed/";
  try {
    const response1 = await fetch(
      "https://opensheet.elk.sh/1zphaLXMRv2KyaVh-GfaGx0F3UHR6QK2iq-5aqiioxcA/main"
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
      const img = document.createElement("img");
      const matchImg = urlNews.match(regex2);
      img.setAttribute(
        "src",
        `https://drive.google.com/uc?export=view&id=${matchImg[1]}`
      );
      newsMedia.appendChild(img);
    }

    // sobre mi
    const sobreMi = document.getElementById("sobre-mi-p");
    sobreMi.innerText = main[0].sobreMi;

    // que hago
    const queHago = document.getElementById("que-hago-p");
    queHago.innerText = main[0].queHago;

    // videos
    const response2 = await fetch(
      "https://opensheet.elk.sh/1zphaLXMRv2KyaVh-GfaGx0F3UHR6QK2iq-5aqiioxcA/videos"
    );
    const videos = await response2.json();

    const url1 = videos[0].video1;
    const url2 = videos[0].video2;
    const url3 = videos[0].video3;
    const match1 = url1.match(regex1);
    const match2 = url2.match(regex1);
    const match3 = url3.match(regex1);
    const video1 = document.getElementById("video-1");
    const video2 = document.getElementById("video-2");
    const video3 = document.getElementById("video-3");
    video1.src = `${embedUrl}${match1[1]}`;
    video2.src = `${embedUrl}${match2[1]}`;
    video3.src = `${embedUrl}${match3[1]}`;

    // images
    const response3 = await fetch(
      "https://opensheet.elk.sh/1zphaLXMRv2KyaVh-GfaGx0F3UHR6QK2iq-5aqiioxcA/images"
    );
    const images = await response3.json();

    const imageUrl1Full = images[1].image1;
    const imageUrl1Thumb = images[2].image1;
    const imageId1Full = imageUrl1Full.match(regex2);
    const imageId1Thumb = imageUrl1Thumb.match(regex2);
    const image1Full = document.getElementById("image-1-full");
    const image1Thumb = document.getElementById("image-1-thumb");
    image1Full.href = `https://drive.google.com/uc?export=view&id=${imageId1Full[1]}`;
    image1Thumb.src = `https://drive.google.com/uc?export=view&id=${imageId1Thumb[1]}`;
    image1Thumb.title = images[0].image1;
    image1Thumb.alt = images[0].image1;

    const imageUrl2Full = images[1].image2;
    const imageUrl2Thumb = images[2].image2;
    const imageId2Full = imageUrl2Full.match(regex2);
    const imageId2Thumb = imageUrl2Thumb.match(regex2);
    const image2Full = document.getElementById("image-2-full");
    const image2Thumb = document.getElementById("image-2-thumb");
    image2Full.href = `https://drive.google.com/uc?export=view&id=${imageId2Full[1]}`;
    image2Thumb.src = `https://drive.google.com/uc?export=view&id=${imageId2Thumb[1]}`;
    image2Thumb.title = images[0].image2;
    image2Thumb.alt = images[0].image2;

    const imageUrl3Full = images[1].image3;
    const imageUrl3Thumb = images[2].image3;
    const imageId3Full = imageUrl3Full.match(regex2);
    const imageId3Thumb = imageUrl3Thumb.match(regex2);
    const image3Full = document.getElementById("image-3-full");
    const image3Thumb = document.getElementById("image-3-thumb");
    image3Full.href = `https://drive.google.com/uc?export=view&id=${imageId3Full[1]}`;
    image3Thumb.src = `https://drive.google.com/uc?export=view&id=${imageId3Thumb[1]}`;
    image3Thumb.title = images[0].image3;
    image3Thumb.alt = images[0].image3;
  } catch (error) {
    console.error(error);
  }
})();
