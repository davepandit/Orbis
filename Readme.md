#### Ideation🧠
- How we can make the `skills and proficiency` in the frontend -
![Skills and proficiency handling in the frontend](./images/image.png)

#### Frontend🥚

In order to persist state in redux we can use a package called as `redux persist`

#### Backend🐣 

- When the user creates an event then a basic info about the event needs to be uploaded, but that should be saved as a draft, and should only be published when all the necessary details about the event has been added by the event admin

- Before using the admin check and eventadmincheck validate token middleware needs to be called

- Admin can do the same thing as that of event admin like access to deleting one event and more

- It is not necessary that the people who are judges or speakers in an event need to be in our database right, basically they may or may not have an account. If they don't have an account then the user_id in the field will be marked to null 