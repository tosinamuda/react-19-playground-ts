# React 19 Playground (Typescript Version)

This is a playground for some of the new features in React 19 and new experimental hooks and features written in typescript inspired by the original [Javascript version](https://github.com/bradtraversy/react-19-playground). It uses the experimental version of React and is meant for testing and learning purposes only.

<img src="public/screen.png " alt="React 19 Playground" />

## Getting Started

To get started, clone the repository and run the following commands:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the app in the browser.

The homepage will show a list of all the examples and you can click on each example to view the result of the code.

You can make PRs to add new examples or improve the existing ones.


## Note
To install the latest version of React and React DOM:

```bash
npm install react@beta react-dom@beta
```

If you're using TypeScript, you also need to update the types. Once React 19 is released as stable, you can install the types as usual from `@types/react` and `@types/react-dom`.  During the beta period, the types are available in different packages which need to be enforced in your `package.json`:

```json
{
  "dependencies": {
    "@types/react": "npm:types-react@beta",
    "@types/react-dom": "npm:types-react-dom@beta"
  },
  "overrides": {
    "@types/react": "npm:types-react@beta",
    "@types/react-dom": "npm:types-react-dom@beta"
  }
}
```