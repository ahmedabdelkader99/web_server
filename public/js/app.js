console.log("Js serverside loaded");

// ربط الصفحه دي بصفحه الفورم في الاندكس

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageCorrect = document.querySelector("#messageCorrect");
const messageErorr = document.querySelector("#messageErorr");

messageCorrect.textContent = " Loading ...";
messageErorr.textContent = " ";

// event listner بحيث لما تضغط تسمع
weatherForm.addEventListener("submit", (event) => {
  // دا عشان ميمسحش الداتا علي طول لا يسيبها معروضه
  event.preventDefault();
  //
  const location = search.value;
  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageErorr.textContent = data.error;
        } else messageCorrect.textContent = data.Temperature;
      });
    }
  );

  console.log("submitted");
});
