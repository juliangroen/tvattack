# TVAttack

### Simple web application pitting two TV-Shows in a fictional battle.

#### Developed to explore simple state (data) management and composing reusable component classes in vanilla Javascript.

## State Management

#### TVAttack uses the Observer pattern to manage state data. The `State` class implements a base `Subject` class while each component implements the base `Observer` class. The `State` object's primary responsibility is to hold all application data and notify all observer components when a change to the state is made. The components that are extended from the `Observer` class are all registered to the `State` object as observers and have their `update()` method called each time the state is changed.

#### This simple state management system is effective but can be improved further by implementing a system to only update the relevant observers based on what data in the state was changed.

## Reusable Components

#### TVAttack uses foundational object-oriented principles to create component classes that can be instantiated independently and reused in the application. Using Javascript's template literals HTML markup can be created and dynamic data can be used via expression interpolation. The components implement a `render()` function which passes in the application state object, and a target element in the index.html page to render the markup into the DOM. Each component is re-rendered with updated data when the `State` object calls all of the `update()` methods.

## TODO
- ~~State Management~~
- ~~Reusable Component Classes~~
- User Interface
- Live Demo`
