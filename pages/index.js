import Box from "../components/inputBox";
import { useState } from "react";
import { copyToClipboard, checkURL } from "../public/scripts/funcs";
import Modal from "../components/modal";
import Script from "next/script";

export default function Home() {
  const [output, setOutput] = useState(null);
  function handleSubmit(e) {
    let inp = document.getElementById(e.target.attributes["data-target"].value);
    let expireTime = document.getElementById("expireTime");
    if (checkURL(inp.value)) {
      e.target.classList.add("is-loading");
      fetch("/api/code", {
        method: "POST",
        body: JSON.stringify({
          url: inp.value.trim(),
          expire: Date.now() + parseInt(expireTime.value) * 1000,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOutput(`${window.location.href}redirect/${data.url}`);
          e.target.classList.remove("is-loading");
        })
        .catch((err) => {
          console.log(err);
          e.target.classList.remove("is-loading");
          openModal(document.getElementById("errorModal"));
        });
    } else {
      openModal(document.getElementById("errorModal"));
    }
  }
  function copyURL(e) {
    document.getElementById(e.target.attributes["data-target"].value).select();
    copyToClipboard(
      document.getElementById(e.target.attributes["data-target"].value).value
    ).then(() => {
      alert("Copied to clipboard!");
    });
  }
  return (
    <>
      <Modal
        id="errorModal"
        title="Error"
        bodyJSX={<>Please enter a valid URL</>}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box onSubmit={handleSubmit} output={output} copyURL={copyURL} />
      </div>
      <Script src="/scripts/modalScripts.js" />
    </>
  );
}
