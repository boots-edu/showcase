This example shows how you can use components to make content that is added dynamically, compared to just manipulating a string.

The first button will modify a bound string member variable, adding another bit of text to it.
This may appear to be dynamic content, but it's very limited in what it can do.
We bound a `click` event to the text itself, but that doesn't tell us WHICH part of the text was clicked - just that the entire string was clicked.
This prevents us from doing anything fancy with parts of the text.

The second button, however, will actually create a new instance of the `SomeTextComponent` and add it to the HTML
of the page using `addComponent`. We can then bind `Click` events to the individual `SomeTextComponent` instances,
so that they can be clicked individually.

If you need dynamically added (or removed) content on a page, you almost definitely want a separate component, so you
can bind events and values to the content. You can't just manipulate strings (although that can be useful for specific purposes).
