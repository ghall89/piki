# piki

A CLI tool for generating image descriptions, powered by Ollama.

## Prerequesits

Because piki runs only with local models, you will need a computer with enough RAM to handle the models you would like to use. In addition, you will need to [install Ollama](https://ollama.com/download), as well as the model you'd like to use. By default, piki uses the LLaVA model, which you can install with:

```bash
ollama pull llava
```

## Install

### On macOS

To install piki, first [download the latest release](https://github.com/ghall89/piki/releases).

Open the Downloads folder (or whichever folder you saved piki to) in your terminal, and run the following command:

```bash
sudo mv piki /usr/local/bin
```

### Build from source

If you prefer to build from source, you will need to install [Bun](https://bun.sh/).

Clone the repo, open the project folder in your terminal, and run the following command:

```bash
bun run build
```

Then, you can install the binary with the following command:

```bash
sudo mv ./build/piki /usr/local/bin
```

## Config

When you first run piki, a configuration file will be created in your user directory called `.piki`. This is a JSON file you can modify to change the Ollama model piki uses (by default, it uses LLaVA).

In addition, you can write a custom prompt by adding a property called `prompt_override` like so:

```json
{
  "model": "llava",
  "prompt_override": "What is this not a picture of?"
}
```
