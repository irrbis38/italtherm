"use strict";

// ========== INIT VIDEO

var initYoutubeVideo = (videos) => {
    // generate video url
    var generateUrl = (id) => {
        var query = "?rel=0&showinfo=0&autoplay=1";
        // var query = "?ps=docs&controls=1";
        return "https://www.youtube.com/embed/" + id + query;
    };

    // create iframe element
    var createIframe = (id) => {
        var iframe = document.createElement("iframe");
        iframe.classList.add("video-iframe");
        iframe.setAttribute("src", generateUrl(id));
        iframe.setAttribute("title", "YouTube video player");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
        );

        return iframe;
    };

    // handling each video element
    videos.forEach((el) => {
        var videoHref = el.dataset.video;
        var deletedLength = "https://youtu.be/".length;

        var videoId = videoHref.substring(deletedLength, videoHref.length);

        var parent = el.parentElement;

        var videoPlayBtn = parent.querySelector(".video-play-btn");

        videoPlayBtn.addEventListener("click", () => {
            var iframe = createIframe(videoId);
            parent.querySelector(".video-preview").remove();
            el.append(iframe);
        });
    });
};

// ========== TOGGLE POLICY

var togglePolicy = () => {
    var policy = document.querySelector(".policy");
    var show_btn = document.querySelector(".footer__policy");
    var close_btn = document.querySelectorAll(".close-policy");

    show_btn.addEventListener("click", () => {
        policy.classList.add("active");
        document.body.classList.add("lock");
    });

    close_btn.forEach((el) => {
        el.addEventListener("click", () => {
            policy.classList.remove("active");
            document.body.classList.remove("lock");
        });
    });
};

// ========== FORM VALIDATION

var initInputCheck = (formElements) => {
    formElements.forEach((el) => {
        el.addEventListener("input", () => {
            el.classList.remove("error");
        });
    });
};

var doFormValidation = (formElements) => {
    var requiredElements = formElements.filter((el) => {
        return el.required;
    });

    requiredElements.length > 0 &&
        requiredElements.forEach((el) => {
            if (!el.value) {
                el.classList.add("error");
            } else {
                el.classList.remove("error");
            }
        });
};

var checkErorrs = (formElements) => {
    var isErrorConsist = formElements.some((el) =>
        el.classList.contains("error")
    );
    return !isErrorConsist;
};

var initFormValidation = (feedback) => {
    var form = document.querySelector(".feedback__form");

    if (!form) return;

    var inputs = Array.from(form.querySelectorAll(".feedback__input"));

    inputs.length > 0 && initInputCheck(inputs);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        doFormValidation(inputs);

        var checkResult = checkErorrs(inputs);

        if (checkResult) {
            form.reset();

            feedback.classList.add("success");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    // get all video elements on the page
    var videos = Array.from(document.querySelectorAll(".video-block"));
    videos.length > 0 && initYoutubeVideo(videos);

    togglePolicy();

    // init form validation
    var feedback = document.querySelector(".feedback");
    feedback && initFormValidation(feedback);
});