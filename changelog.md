Changelog
1.0.0 - 2023-11-29
Sprint learnings

    * I learned how to use the guards
    * I learned how to use a request Handler for a request of httpClient
    * I learned how to create a Module for Angular Material instead of import all the elements in all the components
    * I learned how to use an Toastr of ngx-toastr
    * I learned how to use a table, paginator and sort in Angular Material
    * I learned about HttpTestingController

Changed

    * Principal structure of components
    * Changed the way of how to import the elements of Angular Material
    * I decided no to use components standalone
    * The way of Validate and get the response of the http requests changed, it started to use a request handler

Added

    * The funcionallity to register a new user
    * The option for listing the users and activate their credential from admin user
    * Message to avoid give information about invalid credentials (user not found or invalid password)

Bugs

    * The toast is repeated more than one depending on the calls (check if it's destroyed or not)
    * The register handler uses the same responsa data than login handler but the messages are not correct for registration
    * Calculated the time elapsed from dataEntry to dataProcessed

Changelog
0.1.0 - 2023-11-22
Sprint learnings

    * I learned how to add data to localStorage
    * I learned how to deploy an API as a web server
    * I learned how to user BehaviourSubject
    * I learned how to keep response infomation in variables with `$` at the end of the name
    * I started to use Angular Material
    * I learned about standalone components

Added

    * I created the UI for login (The form for email and password and validate the fields, also enable the submit button when the fields are valid)
    * For now shows an alert to show if the user has been logged or it's not found.
