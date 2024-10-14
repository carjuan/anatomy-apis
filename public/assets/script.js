console.log("hello world");

async function fetchExample() {
  const response = await fetch("http://localhost:8000");
  console.log("sent request and got back headers");

  // body is a ReadableStream
  console.log(response.body);
  for await (const value of response.body) {
    console.log(value);
  }
}

const functionBox = document.querySelector(".function-content");
const fetchBtn = document.querySelector(".fetch-btn");

functionBox.innerText += fetchExample.toString();

// TODO: edit function's content from a page and make it permanent
// to send to server.
functionBox.addEventListener("input", function () {});
fetchBtn.addEventListener("click", function () {
  fetchExample();
});
