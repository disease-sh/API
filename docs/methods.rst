Methods
=======

General Use
-----------

Using the data requires the use of `async/await <https://javascript.info/async-await>`_:

.. code-block:: javascript

    // Declare the package
    const covid = require('novelcovid');

    // Now we create a async/await
    (async () => {

        // Now we await it.
        let all = await covid.getAll();

        // Make sure you return it, this usually implies if you are using this inside a function.
        // Use \n to break lines.
        return console.log(`Cases: ${all.cases}\nDeaths: ${all.deaths}\nRecovered: ${all.recovered}`)

    })()

Sorting Methods
----------------

Some methods can be sorted.

.. code-block:: javascript

    const covid = require('novelcovid');

    (async () => {
        let sortedCountries = await covid.getCountry({sort: 'recovered'});
        return console.log(sortedCountries);

        let sortedStates = await covid.getState({sort: 'deaths'});
        return console.log(sortedStates);
    })();

Filtering Methods for a Specific Area
-------------------------------------

Some methods can be filtered for specific areas.

.. code-block:: javascript

    const covid = require('novelcovid');

    (async () => {
        // Specific Country
        let specificCountry = await covid.getCountry({country: 'United States'});
        return console.log(specificCountry);
   
        // Specific State
        let specificState = await covid.getState({state: 'New York'});
        return console.log(specificCountry);
    })();
