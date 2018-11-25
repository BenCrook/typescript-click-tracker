What & Why
----------

This is a simple piece of functionality built to help me learn Typescript. It consists of some buttons that each have a data-value attribute and when the user clicks on a button this value is stored in an array which is then rendered on to the front-end.

_This would have been much easier to build using React or Vue but I find I often learn more when attempting to do it all myself._

Typescript is used here for type-checking which makes more sense in large codebases but I don't see any harm in using this in smaller projects either as it helps reduce the number of bugs (15% apparently). Overall I can see the benefits of using it and I think I will do in all my JS heavy personal projects as the additional bug catching net seems rather helpful.

It can also be used to transpile JS for older browsers which will be useful for anyone supporting IE.

~~Issue Adding an Event Listener~~ Resolved
---------------------------------------

**The below issue was ~~me being a stupid f\*ck~~ user error as expected, all I needed to do was define a type for button. As I hadn't defined a type it was defaulting to {} which does not contain addEventListener. Doh!**

**The fix:**

    Array.from(this.buttons).forEach((button: Element) => {
        button.addEventListener('click', () => {
            console.log('test');
        })  
    });
    

**The original problem is below, I'll leave it here as we learn from our mistakes.**

* * *

I did run into an odd issue where Typescript returns an error when adding an event listener to an element inside a forEach loop on an Array created using Array.from(). In the below example button has a type of HTMLButtonElement which includes EventTarget in it's prototype chain which does indeed contain addEventListener. I suspect I'm missing something or this is a bug in Typescript, if anyone knows why this happens I'd love to know.

    // this.buttons = document.getElementsByClassName('js-button')

    Array.from(this.buttons).forEach((button) => {
        button.addEventListener('cl     ick', () => {
            console.log('test');
        })
    });
    ---------
    Typescript Error: "Property 'addEventListener' does not exist on type '{}'":
    

The above code works fine but Typescript errors. I used Array.from() as HTMLCollection's prototype does not contain forEach (it's an object) whereas Array does.

Typescript does not complain about the below code which is strange as this does contain an error as it's trying to use forEach on HTMLCollection which does not have forEach in it's prototype chain. So the working code errors in Typescript but the none-working code does not.

        // this.buttons = document.getElementsByClassName('js-button')

        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                console.log('test');
            })
        });
        --------
        Javascript Error: Uncaught TypeError: this.buttons.forEach is not a function
    

However it does work when referring to the HTML collection itself via the index inside the forEach, like so:

    // this.buttons = document.getElementsByClassName('js-button')

    Array.from(this.buttons).forEach((button, index) => {
        this.buttons\[index\].addEventListener('click', function() {
            console.log('test');
        })
    });

It seems that there is a difference between adding an event listener directly to an element inside a forEach loop and adding it via the HTMLCollection. Both do work in Javascript so I'm unsure why Typescript treats them differently.

Workaround
----------

My workaround is to add one event listener to the document itself and handle the logic based on the events target. You can argue this method is better anyway as it's more performant and reduces the amount of event listeners but I can see one huge click event becoming difficult to maintain on larger projects.

If anyone can shed some light on this I'd love to know what is going on, I suspect it's user error (what a surprise, it was).