A component that has inter-component communication:

-   The `Garden` component is composed of `Plant` components, so clicking on the plant fires an event that the `Garden` listens to (to remove the plant).
-   The `GardenMain` component is composed of a `Garden` and a `DisplayCase` component, so clicking the Gather button fires an event that the `GardenMain` uses to add the plants to the display case.
