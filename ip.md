#ReDPT

An visualiser of deadlines.

This web app visualizes all the deadlines of a project and tracks the progress of each task.
Displays the deadline as number of days or weeks remaining(as needed).
Can be used to keep daily logs.

MVP Features

Goal setting.
Deadline heandling.
Support for multipe deadlines.
Add/edit/delete deadlines.
Completetion button.
Time handling.

Non MVP Features(out of v1)

Progress tracker.
Daily logs.
Icon customization.
EisenHower Matrix.

Game rules(according to v1)

Stats : Number of days/weeks to deadline.
Winning : Completetion of task before deadline.(Determined if user clicks completetd before deadline. revisded in later versions)
Losing : Unable to complete task before deadline.(Determined if clock runs out to 0 and user has not clicked completed. revised in later versions.)
What does one day mean : One icon on the deadline chart.

Rough UI(according to v1)

A full screen with header that is constant 
        left most logo
        center search 
        right add

content box 
        all the deadlines present 
        title and a line
        deadline chart with icons representing days/weeks remaining
        option to edit/delete deadline

Meaning of stuff
One icon(initally a square or a circle represents one day left till deadline.)

Per task or deadline 

the following info is stored 
1) Task name 
2) Description (if needed)
3) No of days left
4) No of hours left(if precision is needed)(v2 not in v1)
5) A visual countdown(maybe) (if in v2 not in v1).