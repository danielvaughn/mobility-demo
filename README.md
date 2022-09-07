# mobility-demo

Take-home exercise.

### Instructions

1. `git clone git@github.com:danielvaughn/mobility-demo.git`
2. `cd mobility-demo`
3. `npm install`
4. `npm run dev`

### Highlights

There are a ton of design choices I could talk through, so to avoid a giant wall of text, I'll just list the highlights.

* I chose not to spend time on creating tests, though I can add a few if you feel strongly about it.
Hopefully you can see that the architectural patterns I follow lend themselves to testing.
* To separate business logic from UI, I personally like to use a custom hook that I designed with a former colleague.
You can see it in action in the page-level components.
With this approach, every single (UI-rendering) component can be tossed into Storybook or any snapshot-style testing harness without having to worry about infrastructural things like routing, networking, etc.
* As an addendum to the above point, I should note that I'm perfectly comfortable using whatever state management library your team uses.
I'm not dogmatic :)
* You'll notice that I don't create a lot of UI components.
I like to keep my React trees as shallow as possible - the cost of duplication is far less than the cost of a bad abstraction.
* I personally like to use a modified version of the Air-BnB eslint config.
As stated before, however, I'm not dogmatic about it.

### Issues

I did notice a few discrepancies between the homework instructions, and the observed behavior of the server.
If those were intended to be a test, then no worries, but just in case you weren't already aware:

1. The command to start the server should be `python3 -m server.cli start 5103`
2. Invalid credentials against `/login` return a `401`, not a `403`.
3. I observed that the data format of the `fraction_complete` field is inconsistent.
If the value is below 100%, it's returned in a 0-1 range format (i.e. `0.995`).
But if the value is 100%, it's returned in a .1f format (i.e. `100.0%`).
