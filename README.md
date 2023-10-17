# Smoke Alarm

Recently, I've smacked into a series of coincidences.  Last week, I stumbled across some old notes listing strong indicators of potential burnout, with a comment suggesting that maybe it would make a decent framework for helping then-hypothetical colleagues (and myself) avoid potential problems.  Then, maybe because I had these indicators on my mind, I felt a bit run-down, myself.  And after that, the topic of burnout came up with various people at different times, in different contexts.

It seemed that the time had come to implement this tracking system.  After running the idea by a few valued colleagues, I had a small set of requirements.

 * Low cognitive load, so that this doesn't become *an ordeal*.
 * Accessible from any device.
 * Private, at least to a degree that no user needs to worry about any individual's security practices or continued presence.

The latter two requirements suggested that we wanted something (mostly) serverless, a web-page that might use someone else's database, but with no way for a hypothetical authority figure to access everybody's data.  For the database, [Pantry](https://getpantry.cloud/) seemed to fit the bill, with each user supplying their own storage.

Also needing a name, I bounced around ideas relating to detecting burnout, and while it will inevitably fail to impress anybody, came to the conclusion that a tool that we have a pithy term for a tool that lets you know if something might burn:  A *smoke alarm*.  Again, it won't win any awards, but it gives me a working name for the project.

You have that project in front of you.

