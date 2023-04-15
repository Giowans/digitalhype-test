import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [result, setResult] = useState({
    first_name: "",
    last_name: "",
    id: "",
  });
  const [input, setInput] = useState("");
  const [isDecrypted, setIsDecrypted] = useState(false);

  const decryptMessage = () => {
    let words: string[] = input.split("0");
    let filteredWords: string[] = [];
    for (let i = 0; i < words.length; i++) {
      if (words[i] !== "") {
        filteredWords.push(words[i]);
      }
    }
    if (filteredWords.length === 3) {
      setResult({
        first_name: filteredWords[0],
        last_name: filteredWords[1],
        id: filteredWords[2],
      });
    } else {
      setResult({
        first_name: "",
        last_name: "",
        id: "",
      });
    }
    setInput("");
    setIsDecrypted(true);
  };

  return (
    <main className="flex flex-col min-h-screen p-10">
      <div className="flex flex-row items-center">
        <h2 className={`${inter.className} font-bold text-2xl`}>
          {" "}
          A test challenge planned by{" "}
        </h2>
        <Image
          src="/dh_logo.jpg"
          alt="Vercel Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-around my-10">
        <div className="flex flex-col items-center lg:flex-row">
          <h3 className={`${inter.className} text-xl text-gray-300`}>
            Insert here the codified string
          </h3>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="px-3 py-2 mx-2 my-2 text-lg text-white rounded-lg lg:my-0 bg-zinc-800/70 border-1 border-zinc-800/30 focus:border-white"
          />
          <h3 className={`${inter.className} text-xl text-gray-300`}>
            and then
          </h3>
          <button
            onClick={() => decryptMessage()}
            disabled={input.length === 0}
            className={`${
              input.length > 0 ? "bg-green-800" : "bg-zinc-800/70"
            } mx-3 my-3 lg:my-0 text-xl rounded-lg py-3 px-4 transition-all duration-200 cursor-pointer`}
          >
            decode it
          </button>
        </div>
        <div className="flex flex-row items-center justify-center mt-2">
          {result.first_name && result.last_name && result.id ? (
            <h2 className={`${inter.className} font-bold text-2xl`}>
              <span className="text-violet-300">{result.first_name}</span>{" "}
              <span className="text-violet-300">{result.last_name}</span> with
              ID: <span className="text-violet-300">{result.id}</span>
            </h2>
          ) : (
            isDecrypted && (
              <h2 className={`${inter.className} font-bold text-2xl`}>
                There is an issue with the input...
              </h2>
            )
          )}
        </div>
      </div>
      <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        <p className="static flex flex-col justify-center w-auto w-full p-4 bg-gray-200 border border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl">
          The dictionarie may look like this in console:&nbsp;
          <code className="flex flex-col mt-2 font-mono font-bold">
            <p className="text-orange-300">{"{"}</p>
            <p className="ml-3 text-violet-500">
              {`first_name: `}{" "}
              <span className="text-white">{result.first_name}</span>
            </p>
            <p className="ml-3 text-violet-500">
              {`last_name: `}{" "}
              <span className="text-white">{result.last_name}</span>
            </p>
            <p className="ml-3 text-violet-500">
              {`id: `} <span className="text-white">{result.id}</span>
            </p>
            <p className="text-orange-300">{"}"}</p>
          </code>
        </p>
      </div>
    </main>
  );
}
