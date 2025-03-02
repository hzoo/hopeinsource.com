---
title: TabFS (Omar Rizwan)
season: 3
date: 2021-02-19
time: "26"
description: What happens when we open up browser APIs like a filesystem? Omar
  Rizwan joins Henry to chat about his latest project, TabFS! We discuss
  possible extensions, tinkering with scripts vs being a whole project, writing
  it yourself, few dependencies, determining your 1.0, literate documentation,
  and maintaining a newly popular open source project!
episodeLink: https://anchor.fm/s/ff707650/podcast/play/96461749/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-11-31%2F392345721-48000-1-5943dd07847ccba7.mp3
embedUrl: https://podcasters.spotify.com/pod/show/hopeinsource/episodes/TabFS-Omar-Rizwan-e2su9fl
sidebar:
  order: 14
---
### Transcript

> Conversations may be edited for clarity. [(edit)](https://github.com/hzoo/hopeinsource.com/blob/main/src/content/podcast/season-3/tabfs.md)

#### TabFS or BrowserFS?

[0:00] **Omar:** It's funny. You know, one thing that I thought was interesting. This is something that [Andy said](https://twitter.com/andy_matuschak/status/1348744953334153216?s=20) is that like, I don't have much of a use for the project, cause I'm not a big tab user. And I think it's funny how many people have sort of glommed onto this idea that this is about tab management.

[0:14] **Omar:** It's like I have a hundred tabs open and I need this tool to help me manage tabs. When I think that's almost just a historical accident, coincidence, that the name of the project is to have a fast and that the early examples are about managing tabs because that was not my intent when I started and that's not really my long-term, I mean, it's certainly part of the system, but it is not really the things that excited me the most about it.

[0:37] **Henry:** Right. Maybe that was like the simplest example you could think of. People latch onto that. You were going from more of like the whole analogy of this is something that we use a lot, and then this other thing, FS is something that a lot of people understand and how to match those two metaphors.

[0:53] **Omar:** And I mean, I started this like four years ago, and I had like gone through a number of different designs for it when I've had time. The original title was ChromeFS. And I wanted to replace the Chrome because I didn't want to have the trademark in the title. But I don't know why I didn't go with BrowserFS.

[1:06] **Omar:** But it is very much this idea of like your browser is this weird mini operating system. And then your real operating system has all these tools. How do we kind of bring the browser out? And tab, I guess, is just the most concrete thing in your browser, and so that got promoted to be the title.

[1:23] **Omar:** Maybe part of it is also the browser extension APIs. If you go look at the Chrome extension API, the tab APIs are like pretty prominently placed and it's easy to understand what they do. So those were some of the first examples that I started writing. And so maybe that kind of accidentally dominated the presentation of the extension.

[1:40] **Henry:** Right. And then it is a common thing for people to say they have thousands of tabs open, and there are extensions that help you with that.

[1:47] **Omar:** Right. So maybe it's unintentionally a good presentation. I think when you have a demo like this,  like there's a lot of usefulness in being kind of conservative in what the demo does, where it's like something that people recognize as something useful.

[2:01] **Omar:** I was thinking about this cause I was looking out some of the comments. Some people were like, well, why doesn't it use SQL or why didn't you come up with some more radical concept than just turning it into files? Files are a limited interface.

[2:15] **Omar:** And I honestly think that.. I could have made it like a SQL Lite thing or whatever, but I think if I had done that, it would've gotten much less uptake, because I think fewer people know SQL. In some sense, the conservatism is part of why the demo is so compelling to a broader public. And then over time, hopefully, I can nudge people towards something a little bit more cutting edge.

[2:34] **Henry:** Yeah. Even going back to our other conversations about spatial stuff, being able to see that it's in finder, I think that's a lot cooler than saying it's a SQL database.

[2:44] **Omar:** Yeah, that's a good point. It's like you have this very concrete, like screenshot of these icons. And that's like the banner of the project is just these three finder icons. And it's like, if I made an SQL thing.. There is no equivalent of that for SQL where it's like, everybody recognizes what it is. And everybody can tell, Oh, this is files.

[3:01] **Henry:** Right. You would have to pick some like SQL visualizer or something.

[3:05] **Omar:** Yeah. Maybe if it was a spreadsheet or something, then you could do that, but for SQL it's much more kind of abstract. That kind of visual detail matters a lot. Or like the video where I'm like going through the different files in Finder.

[3:18] **Henry:** Yeah. That's something that people are opening up every day and they recognize it, even if you're not a programmer, right. I think that's cool where there are people that might not even understand FS, but then they can see the value.. They see that that's powerful.

[3:31] **Omar:** There were definitely people who were like, I don't know how to install this, but it looks cool. And I think they like understand that at some level, which certainly wouldn't be true if it was SQL.

#### Project Boilerplates vs. Toys

[3:40] **Henry:** You brought up that it's a way for people to make extensions too right. A different interface.

[3:45] **Omar:** Yeah. That's one framing that I think is pretty compelling, but I don't have any good examples for it yet. Unless you count the tab things. If you were really masochistic about writing an extension to close all your stack overflow tabs.

[3:59] **Omar:** It's interesting cause it's like very much a different way of thinking about programming your computer. And it's sort of in line with some of the Dynamicland stuff, where you just sketch something out and that's a program. And it can like talk to all of this other stuff that you already have in your environment. In terms of really lightweight programming, in terms of having this space, the file system or the real world, where you have all these operations that you already know, you can just kind of reuse them now applied to new stuff.

[4:28] **Henry:** This kind of stuff let's you have the mindset of like exploration and play, I suppose. It's like kind of, you don't really care. Just make it happen.

> 3. a lot of the difficulty of making an extension that I had in mind isn't these Web content issues; it's stuff like, you have to write it as these 3 separate scripts that communicate asynchronously, and you need weird manifest file, and you need to manually import your extension - [tweet](https://twitter.com/rsnous/status/1261489605364178945)

[4:37] **Omar:** Yeah. One like weirdly concrete way I think about this is if you want to make an extension, you have to make like four different files and you have to like put them in a folder. You have to make this manifest file to tell your browser what the extension is about. You might have to make like two or three JavaScript files.

> I think that the browsers assume that your extension is a Product and you won't mind doing a lot of bureaucracy to distribute it because it's amortized over the scale of your product 😕 - [tweet](https://twitter.com/rsnous/status/1346681133845544961)

> like Android and iOS suggest that the average program is a substantial app built over a few months, where the packaging complexity doesn't add much to the dev time. they don't imagine that you would make a little script in 20 minutes to play with an idea - [tweet](https://twitter.com/rsnous/status/1305716596334157825)

[4:54] **Omar:** Clearly they're not thinking the same way you would if you were making a Python script or a shell script or something. They're thinking when you make an extension, it's an undertaking. It's very similar to trying to make an iPhone app or an Android app, where it's like, you have to make a project. You have to open it in this IDE and there's all this stuff around it. Even if you only want to do something very simple,

[5:15] **Henry:** Right. The whole boilerplate concept, I suppose. I mean, this is true, even with making a web app now. I guess you could just make an HTML file, but..

[5:24] **Omar:** I try to, whenever I can. Yeah.

[5:26] **Henry:** Right. You feel like you need to use something that someone told you, whether it's WordPress or Gatsby or create react app, but maybe that's worse.

[5:35] **Omar:** Yeah. And this is related to what we talked about in the last podcast, it shows that they're optimizing for people who are making a certain kind of thing, right? Facebook is making their messenger app or their messenger website, so that's going to be a huge app. So it doesn't matter if there's all this boilerplate around it cause it's still going to be a small percentage of this giant app that they're making. If I'm making like some one file thing and I need all this boiler plate, you know, the boilerplate dominates the actual application.

> Weil man sich danach nicht mehr mit 1000 Extensions herumärgert, die 95% dessen machen, was man braucht, sondern sich stattdessen einfach einen Einzeiler schreibt! ^^ - [tweet](https://twitter.com/RandomInsomnia/status/1345242968006004737)

[6:02] **Omar:** One reply to the tweet that I really liked. I think it was in German, so I used the little Twitter translate thing. There were two people. One was like, this is really cool, but what's the point of it. And then the friend who replied to them, was like, well, now you can get rid of 95% of your extensions and just have these little scripts and stuff.

[6:21] **Omar:** And I think that's definitely something that I want to push toward. I think that's like a really cool vision of what you could use this for. Rather than have 10 of these super complicated extensions with a ton of features where you don't understand them, you just have this TabFS, and then you just kind of program it from the outside to do whatever minimal set of functions that you actually need.

#### Doing It Yourself is More Fun

[6:42] **Henry:** That's sorta similar for say JavaScript in NPM. Some people are more willing to just inline them in their own project.

[6:50] **Omar:** Yeah. Like there's some point where the overhead is bigger than the costs of just doing it yourself.  There's like also an interesting emotional component to this question of should I use a library versus should I implement it myself?

[7:05] **Omar:** I was just talking to somebody about this. I think in a lot of cases, implementing it yourself is actually kind of more fun. It may take more time, may take less time. But when you implement it  yourself, you're actually programming and you're using tools that you understand.

[7:18] **Omar:** Whereas when you use a library often, you have to figure out what it's doing, read the documentation, see if you can configure it in the right way, which I think is actually a very, very different feeling from programming a system that you really understand by yourself.

[7:33] **Henry:** right. And I guess we got used to this like glue mindset of like taking things and putting them together. Maybe you feel less like agency because even though it's all open source and you could change everything, you feel like you don't have as much control. The trade-off is at what level is it worth doing it yourself.

[7:51] **Omar:** Right. I mean, it depends on the actual domain, but I always feel like I'm usually okay with like having one or two really big dependencies where I'm like intentionally attaching myself to this thing, but lots of people use it. It's pretty much standalone.

[8:06] **Omar:** It's interesting in the case of TabFS, because part of the reason that it took me a few years to really finish this project is that I spent a while playing with different frameworks and different languages. There was a file system that was written in go. And then there was a browser extension that was written in TypeScript with Webpack and all this other stuff. And then over time, I just got more and more fed up with the dependencies and with like trying to write wrappers so that TypeScript would accept the weird things I was doing. All of these things that are pretty much incidental to the thing that I'm actually trying to do.

[8:40] **Omar:** And so now it is basically pure C and pure JavaScript. There's no like package manager. There's no build step. The browser extension is one JavaScript file. And it's just plain ES6. And the C file system half, which is the half that talks to your operating system.. You do have to compile it, but it's just one C file. And it only depends on FUSE, which is the module that you need to, to make file systems for your computer.

[9:05] **Henry:** I wonder if there's like this progression of starting with as many dependencies as possible and then slowly getting rid of all of them until there's only like one or two left out of frustration.

> I have a lot of problems with open source as-is as a solution to this -- I think it's hugely more difficult and takes a lot more willpower to fork a library or send a pull request than to change something in your own code. you really have to go out of your way - [tweet](https://twitter.com/rsnous/status/1292639339730542593)

[9:16] **Omar:** I mean, it's like, especially if you find that the dependency isn't quite right, forking that dependency and changing it.. It's almost harder to just get rid of a right. You have to do basically the same amount of work.

[9:28] **Henry:** Yeah. I find that to be the case. You end up like removing the whole thing instead, but then you're like, that has nothing to do with my initial goal.

[9:36] **Omar:** Right. There's this aesthetic element to it, right? Where at least I always am like a little bit uncomfortable when I have a file I don't really need or dependency I don't really need it. So it becomes this compulsion to try and root them out, like cleaning your room or something.

[9:51] **Henry:** Is it that other people don't notice the room is messy? I don't know.

[9:56] **Omar:** Or I think part of it is also like, if it's your room, like if you have this feeling of ownership over it, , that you want it to be clean.

[10:04] **Henry:** Yeah. Either you have the habit or you do notice everything around you is getting worse and worse, but then there's a point where you're like, okay, I'll clean it. But most of the time it's messy.

[10:13] **Henry:** If someone else came in and tried to clean your room, you would get frustrated because you're like, I know what that was in that place. You kind of had that

[10:19] **Omar:** right, right, Right. That's an interesting part of this is that this is a project that I basically was working on for a few years, you know, very much on and off, obviously. But it was like basically like in my head. And so is that part of why it's turned out the way it has? Where it has very few dependencies and it's just these two files, because it was like, there is no division of labor between different people. And it has this very clear kind of, I can drive it to have the aesthetic that I want.

[10:49] **Henry:** Was it a Devon that tweeted, this seems like a project that only you would make?

> [Console 35 Newsletter](https://console.substack.com/p/console-35)

[10:54] **Omar:** Yeah, that was a really nice comment. Yeah. I answered some questions for someone's newsletter about TabFS, and one of the questions was how do you distinguish good project ideas from bad project ideas? And this was part of my answer, is that I think a good project idea comes out of some kind of personal history or personal relationship that you have with the concepts or with the system. Like it's something that not anybody could just come up with and try.

[11:21] **Henry:** Right. There's a conviction that you had and that uniqueness.

#### What is a 1.0?

[11:25] **Henry:** You shared with me earlier, like what you were working on and then you ended up just posting it. And so I guess you felt, it was okay to not need what you considered 1.0. That goes back to whether the idea came across and you didn't need it to be like a huge thing that everyone depended on.

[11:42] **Omar:** Yeah. So I posted this on new year's Eve. And the reason I posted it on new year's Eve was I kind of looked at what I had done, and half the page is still to do is, but I was like, okay, I can just leave all these and just post it, so it was done this year. And I think that was the right move. I think people pretty much got the message about what this thing is. Maybe not to the extent I wanted, but it'd be hard to imagine more people seeing it than ended up seeing it. Yeah, I think there's a spectrum where there were earlier versions where I didn't have the examples up, or I didn't have the pictures, or I didn't have some of the functionality that powers the examples where I think those would not have been good to post. So I think it was the right time.

[12:20] **Henry:** In terms of like, you already hit, finished the implementation, but then you added all those

[12:25] **Omar:** Yeah. Yeah. And I think that that was important. And it's also because of the way. Like, if you look at the page, actually it has this gray background. It has this like kinda janky font. And that was actually completely intentional, because I changed the font and I changed the background from all the other pages on my website, because when I was writing it, I was like, I didn't want to have this nice looking font or this white background, because it makes it feel like I want to be writing in full sentences. It makes it feel like I want it to be a finished page. So I intentionally kind of made it look rougher so that I would feel more comfortable leaving all these TODOs in and kind of just jotting things down.

[13:06] **Henry:** That's funny. That reminds me of being able to physically see that the website is like older or like in progress. And you kind of subtly did that through the color.

[13:15] **Omar:** Yeah. Well originally I think I was using the GitHub readme, and then I moved it to my website and I was like, this looks too, this looks like it would have two high a standard, so I had to step it down.  I'm kind of surprised that there's not more open source projects that take this kind of approach.

[13:33] **Omar:** Maybe I'm just not paying enough attention. Where you just like have this long page. You intentionally say that a lot of stuff isn't done. Because to me that's one of the big advantages of this being an open source project instead of like a product or something. Like I could not make this a product without like several months of work. But if it's an open source project, I can kind of just punt on a lot of these things and hope that people will get the idea.

[13:55] **Henry:** Right. I'm just speculating, like a lot of open source now feels like it has to be a thing as well. Even though it started off being you put things on your resume, that kind of feels like this. But the purpose of that is also for the resume, not for just putting something out there.

[14:11] **Henry:** And then there's the whole, I need my project to have a logo and that's when it's like a real project. We joke about that, but that's kind of true.

[14:18] **Omar:** Yeah. I mean, you also see that with, this is  a bit of a tangent, but you see that with people complain about this with security vulnerabilities now to, is this culture of getting a domain, getting a logo. It's sort of interesting how these things develop.

[14:33] **Henry:** Hmm, instead of just a CVE?

[14:36] **Omar:** Yeah, I guess, right? Like that's definitely a new phenomenon where you have, heart bleed or a shell shock. Some of these other things where they do get a nice domain and have a nice landing page. I feel like maybe the culture of JavaScript in particular has kind of encouraged a lot of

[14:52] **Henry:** Throughout the whole development community.

[14:53] **Omar:** And also, like, I think part of the reason that it made so much sense to release this early is it was never clear to me what a 1.0, would be. It's released early in the sense that there's a lot of stuff that is listed on the page that's not done. But like if I had just deleted all that stuff from the page, then I guess it would be done, right. It's not like there's like some kind of spec that I'm trying to meet.

[15:17] **Henry:** Yeah, exactly. What is a 1.0 anyway? The only reason why it's a 1.0 is because you decided at one point, it's 1.0. Even though in reality there's no difference. It's just like a arbitrary distinction.

[15:27] **Omar:** Another interesting thing is that because it's open source and because of the audience that it's reached, it provides this sort of comfort to me. The people who are looking at this have the kind of technical sophistication where they can deal with hiccups in the installation, hiccups in the thing running. I don't feel like I need to make it a super smooth path. And so obviously that's like a particular audience and that's excluding a lot of people who maybe would find this useful, but from my end in terms of not having to work a lot on polish, I found that and still find that really reassuring.

#### Getting Help, Literate Documentation

[16:05] **Henry:** If anything, given the nature of the audience, they will do all of it for you sense, was just kind of amazing, right?

[16:13] **Omar:** Yeah. And this is getting at another topic in this meta area. Like I've gotten some really phenomenal pull requests from people where they're kind of going through things in the implementation where I'd left that thing to finish up later or to fix up later. And then they basically just go fix it all and then submit the pull request.

> [multi-threaded tabfs.c PR](https://github.com/osnr/TabFS/pull/29)

[16:31] **Omar:** One of the first pull requests that I ever got for this project was someone who basically went and took the C half of the project and made it multithreaded.

[16:43] **Henry:** That's huge.

[16:44] **Omar:** It went from like maybe 300 lines of C to 400 lines of C. And I looked at it. And I was like, it looks good, merged it. And we've been multi-threaded for two weeks. It works great. It's like a huge speed increase. It's a nice validation of the architecture that I came up with, because it basically like everything just worked on top of that. The JavaScript really didn't have to change. None of the synthetic files implementations had to change, it all just instantly became multithreaded once you swapped this bit of the implementation.

[17:10] **Henry:** That's awesome. Wow. Speaking to the whole architecture again,  I think you mentioned like you didn't document too much, but given the fact that it's just one file for a bunch of stuff, it was pretty, relatively simple for people.

[17:22] **Omar:** Yeah, and this is also something that we talked about a bit at dynamic land. I think documentation serves a really important function of getting people familiarized with what they can do with the system. But how can you achieve that function by getting people to look at the source code instead. And maybe augment the source code with little hints or comments. It's like going to stay authoritative if you're just looking at the actual source code. It's less work for the implementer. And so in so far as I want more documentation, I really want to push for that to be the form where we have kind of a linear programming model. You're actually looking at some kind of view on the source code and that's how it's documented.

[18:02] **Henry:** Yeah. I guess even thinking about like how many people engage with the project. How many people ended up actually attempting to install it, let alone look at the code, let alone try to like do something with it right?

[18:15] **Omar:** Right, right. So I want to smooth out that path for sure, but I don't want to smooth it out in the sense that I'm just putting these opaque shells around it.

[18:23] **Henry:** Right, because you want them to go all the way down to the whatever level of abstraction.

[18:27] **Omar:** Yeah. I wonder if there's like something I could do where like to install it, you have to make some kind of change to the source code. Kind of force people to really dive in. This was something that we sometimes try to do at Dynamicland when people were visiting was we try to get you to, you know, write your name in a little program that you put it down, it would display your name.

[18:46] **Omar:** And that I think, especially for people who are maybe less comfortable, that kind of breaks this emotional barrier of like the text programming system is intimidating. And I think that's true even for programmers with, open source projects that they're using. A lot of the time, people won't look at the source code? It's not an expected thing that you do.

[19:03] **Henry:** It would be nice if it was like more of an instinct that you would turn to that first, rather than turn to the issues. I've seen people talk about how in open-source we need not just onboarding, but a way of deep diving into code. Maybe you mentioned people putting one in to put like a trace into the GitHub repo or just a program that you run that goes through what things are happening.

[19:26] **Omar:** Yeah, this project is maybe in a good position where that would be compelling because you can imagine some kind of trace or introduction where like you have your actual tabs open. And so it can do something where your data is actually flowing through it. That's something that I think people really find cool and a lot of the draw to actually installing this thing is this kind of moment when you see your tabs as files.

[19:49] **Henry:** Very meta, because you could reference that in this tutorial, this is the tab you're on right now.

[19:53] **Omar:** Yeah. I, I want to do more of that. This would be a cool area to do some stuff in where you can like hop between your browser world and your graphical file Explorer world. And there's links you can click that go from one to the other. Because that's stuff that when you think about it, it's kind of obvious, but nobody really does it. I think partly because of the communications overhead of like, just implementing all this stuff. But with the file system, it's really easy.

[20:16] **Omar:** It's also gets at some of the stuff from Acme Plan 9 editor. It sort of provided these hypertext system where if you had a text file and it had the name of another file in it, you could click on that and it would hop you to that file. Or you could put a line number after that and you could hop to that line number. So you could kind of build this hypertext network of stuff you were working on just in the plain text.

#### Taking Phrases Seriously

[20:37] **Henry:** I don't actually know much about Plan 9. Apparently in that everything is a file, but I guess you said that you explored that before, and this is something similar.

[20:45] **Omar:** Yeah, I think that this is taking some of the ideas and trying to modernize them. Well, I mean, everything is a file. That's a phrase that goes back to the original Unix. Today, even if you take like an operating systems class, like I TA'd operating systems in college at Stanford.

[21:02] **Omar:** Like everything is file is something that people sort of just like mumble. It's like part of history. It's like part of why Unix won. It's not something that I think people actually like often really take seriously as like, Oh, I have all this stuff on my computer. I have all these browser tabs. How can they be files? And so part of the kind of deep drive of this project is to actually take that mantra seriously and turn like modern concepts on your computer into files.

[21:28] **Henry:** Okay. Something that people tell each other, but nothing in our systems actually reflect that statement.

[21:34] **Omar:** Like no new concepts. I mean, yeah. Like your Unix processor files and your sockets are kind of like files. But you know, your Twitter users are not files, your posts on your Facebook feed aren't files. And I think pushing for more of that, I mean, it's kind of like what we talked about with regard to freshness and scripture in the last podcast is like taking these ideas that people now just kind of mouth and really reevaluating them and reapplying them.

[22:01] **Henry:** You mean like tradition and ritual that people have lost the reason why they do it. And they need to revisit that and reinterpret that in the current time.

[22:10] **Omar:** Yeah. And I think it's been fruitful doing that with this. So Acme is this text editor that's sort of like the Emacs of Plan 9. It's a text editor that's built into the operating system. And the way that you extend it is that it provides this file system. And you can like write a plugin for Acme, basically that just manipulates this file system. So you can write a plugin basically in any programming language, because all programming languages essentially can operate on files. And so that was one of the ingredients that went into thinking about how to do a browser file system. Is this idea of like, you can write a plugin in any language. And the plugin API is not an API at all. It's actually this synthetic file system. Extensions

[22:53] **Henry:** Right. And so you could theoretically use it across any browser and then also extend the fs part to other things.

[23:00] **Omar:** Yeah, there's like a lot of different directions that it could go in there. There's a direction of like, what stuff do people want to do on top? And I think there's already a lot of stuff you can do on top.

[23:10] **Omar:** I've seen a couple of things that other people have done. There's this one that I linked from the page where somebody can scrape out what song is playing on YouTube music. Now you just have access to that through the file system. And then there's also expanding the sort of interface with the browser so that you can get like the source code of pages, so that you can manipulate stuff from your terminal.

[23:32] **Henry:** I guess right now, maybe a lot of it is around like reading stuff rather than like writing

[23:38] **Omar:** Yeah. I think that a lot of people who gave it only a cursory look assume that it was all reading and not writing. Partly because I didn't put a ton of examples in for writing. But that was one of the original ideas for the file  system was that you could use it to do live editing of webpages, because you just have it mounted as file system. And then you can go edit the JavaScript or the HTML on the mounted file system. And then that would just live edit the webpage.

[24:05] **Henry:** Yeah. I saw a [PR that made an API for textareas](https://github.com/osnr/TabFS/pull/51).

> [Keeping Tabs on your abstractions, Anil Dash](https://anildash.com/2021/01/03/keeping-tabs-on-your-abstractions)

[24:10] **Omar:** There are extensions that do just that specific thing, right? Like where you can use vim to edit text areas. So you can write email in Gmail or you can use Emacs to edit text area. Like I've seen those and that's a whole extension to do this pull requests that's like five lines of code. So I think there is a real use for it. And somebody who had a blog post about TabFS mentioned that as one of the first things they wanted.

[24:35] **Henry:** I was thinking it would be cool to have another view for your history.

[24:39] **Omar:** Yeah. I think history, bookmarks, window management, going into like the DOM and the JavaScript object graph. Part of the reason people really read it as being about tab management.. That is the domain that's the most fleshed out in the synthetic file system and in the examples. And I think there's probably some really useful stuff you could do in terms of backing up your bookmarks, searching through them, filtering through your history, doing kind of SQL style queries. I think it's totally possible.

#### Community Response

[25:11] **Henry:** You wrote some stuff about this response from community. Maybe you can talk about that.

[25:16] **Omar:** Yeah. We talked a little bit about it already. I've gotten some great pull requests. A lot of good issue reports. Well, it's funny how many of the poll requests and issues have been kind of either on installation? Like I can't quite install this on MacOS I can't quite install this on Linux. Or I want to port to Safari. I want a port to Firefox. Or implementation stuff, fixing bugs where I didn't write some C code properly, adding this multithreading thing. Rather than really pushing what I would see as the kind of core really interesting stuff, which is how do we expand the interface with the browser? That's where a lot of my attention I want to go. And so I wonder if I haven't documented that part enough, or if I need to have more structures to support that. Or maybe people just, maybe people just don't have new ideas about what to do there.

[26:08] **Henry:** Maybe the latter. I'm at the point where, I see there's a lot of potential there, but I can't actually think of anything.

[26:14] **Omar:** This has been like stewing in my head for a few years, so it's like, I have maybe an advantage over a lot of people. And the other thing that I wanted to say about response from the community is because of the way that the launch went, where it was immediately like number one on hacker news for like full day and a half. It was like really, really popular. And then also mentioned in a bunch of other places. It immediately went from basically like this project where I was the only one on the project. It was a private project that I've never linked anybody to. To having like thousands of stars and like dozens of issue reports and pull requests or something. So it was this very like accelerated timeline for open source, where, like immediately I was suddenly the maintainer of this project with like a bunch of people sending me stuff.

[26:57] **Omar:** But I think that's like that in some ways makes a lot of the choices a lot clearer than when you have this kind of boiling frog situation where your project slowly grows and then over time, after a few months or a year you find that you're maintaining its thing. Where now to me, it's like immediately clear that I need to like figure out, how am I going to spend my time with us? What kind of commitments do I want to make?

[27:18] **Henry:** Thanks so much for listening to this episode of Hope in Source. To continue the conversation, you can find me on Twitter at left underscore pad. If you'd like to check out the transcript with links and references, please visit hopeinsource.com.
