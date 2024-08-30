---
title: "Software Tetris (Stephen Kell)"
season: 3
date: "2021-03-09"
time: "42"
description: "What is the state of modern software now, and how is it like losing at Tetris? Stephen Kell joins Henry to chat about Ivan Illich's thought (counter-productivity, radical monopoly, critique of institutions) applied to software! We talk about the software/hardware arms race, how our default is more is better, tech being all-consuming, tyranny of updates. (recorded in Dec 2020)"
episodeLink: "06996f31"
embedUrl: https://share.transistor.fm/e/8b84652f
sidebar:
    order: 15
---

### Transcript

> Conversations may be edited for clarity. [(edit)](https://github.com/hzoo/hopeinsource.com/edit/master/season-3/tetris.md)

#### The Software/Hardware Arms Race

> "Do increased performance and functionality keep pace with the increased demand for resources? Mostly the answer is no." - Niklaus Wirth ([A Plea for Lean Software](https://cr.yp.to/bib/1995/wirth.pdf))

[0:00] **Stephen**: [Niklaus Wirth](https://en.wikipedia.org/wiki/Niklaus_Wirth) wrote in the nineties that [software is getting slower faster than hardware is getting faster](https://cr.yp.to/bib/1995/wirth.pdf). Which okay, maybe that's only true-ish. But I was kind of interested in research on [software verification](https://en.wikipedia.org/wiki/Software_verification) at that time, and I realized that this was almost a [Zeno's paradox](https://en.wikipedia.org/wiki/Zeno%27s_paradoxes) sort of situation. It means that verification technology is kind of stuck just far enough behind the curve. It still never scales to the contemporary software because in the meantime that has got so much bigger and more complex as well. 

[0:27] **Henry**: And when you mean verification, do you mean proving that it's right? 

[0:31] **Stephen**: Yeah, exactly. So formal verification. There's lots of different techniques. People do pen and paper proof sometimes. They're actually quite good for humans, but they are sometimes wrong or don't actually correspond to the software that people really run. And then there's more machine checkable and other techniques like [model checking](https://en.wikipedia.org/wiki/Model_checking) or [symbolic execution](https://en.wikipedia.org/wiki/Symbolic_execution). And they all have scalability problems of different kinds. I just sort of started to think, well, software keeps getting bigger. This isn't good. And..

[0:54] **Henry**: Is there an end?

[0:55] **Stephen**: Exactly. It's the discipline that's grown up around thinking that the challenge is making "the software". All the classic software engineering literature, with a few exceptions, tends to take this sort of delimited view, right? All these ideas about software being a project that is managed: where you have a project involving certain people with certain requirements, and it lasts a certain time, and it is sort of delivered. 

[1:16] **Stephen**: Nowadays, a lot of software that is in very widespread use is much more of a continuous process and it's much more interconnected. It's more like *software is an organism* that is continually growing and gaining limbs. And because it used to be the case that actually writing the code and delivering the thing was the hard part, then we sort of optimize for that. But now we've optimized for growing stuff really quickly. And not so much about containing it, or preventing it from sort of taking over the world, I guess.

[1:43] **Henry**: Yeah, I think code as artifact has turned into code as infrastructure. And how open source works now, it's like you do your thing that has a very specific use case. And then one day you suddenly get a million users, and then they all ask you to do things. Most people are really bad at saying no, so we add on all this stuff and it gets bigger. The project I work on, Babel, it's a JavaScript compiler. It feels like ubiquitous where it's like touching everything.

[2:08] **Stephen**: Yeah. And I guess the story of continuous compatibility is right there, isn't it, in that project. I started out really in research thinking about ways of breaking that connection. What if you've got some software targeting some interface. How do I run that software in an environment that doesn't provide that interface? What are ways in which the the tooling, the languages available to me, could make that easier? And that hasn't really attracted a lot of attention. Because we're trained into thinking that that's not a real problem, that the real problem is writing the code or the real problem is, well, you've got to fix your code to stay up to date with whatever interface you're depending on. And if you don't, then it's kind of.. It's your fault, right? Well, what are you going to do? Of course software changes. And you know, stable foundations, who could expect that? Software is going to keep changing and it's human beings' job to sort of keep working at it.

[2:54] **Henry**: It's weird cause the point of our project is actually in some sense not to exist, right. We help translate new stuff so that eventually you can get rid of at least parts of it. 

[3:04] **Stephen**: Yep. I sometimes say it's like playing Tetris where you want to find a piece that fits into a space so that suddenly you could ignore a whole lot of other complexity. And that you can sometimes find those pieces and we're pretty bad at it. And I wish I could formalize that intuition a bit better. Cause it feels more powerful than I've managed to make it sort of actually work so far. The picture I get is like.. *Losing at Tetris is basically the state of software right now* where blocks are just falling into place. We don't have time, we don't have the resources to put them in the right place, so they just kind of pile up and there's kind of an explosion of kind of arbitrary complexity.

#### Solving a Crisis by Escalation

[3:37] **Henry**: If we talk about [Illich](https://en.wikipedia.org/wiki/Ivan_Illich) and this kind of thinking, it doesn't mean we don't think that technology has good parts and that we should get rid of it entirely.

[3:45] **Stephen**: Right. So what do we want to say about Illich? So I chanced upon Ivan Illich because I like riding my bike, and I get around by bike. And I have a sort of another Twitter account where I just follow kind of random stuff, including a lot of things about cycling. And someone just tweeted this a link to a passage from one of his books, [Energy and Equity](http://debate.uvm.edu/asnider/Ivan_Illich/Ivan%20Illich_Energy%20and%20Equity.pdf). And I was just.. Immediately I read this and I was transfixed because I thought.. This is talking about software. 

[4:11] **Stephen**: It wasn't talking about software. But it could have been talking about software, cause it was written during the oil crisis in the seventies. He was debunking the idea that the problem in society was somehow a shortage of energy.

[4:23] **Henry**: Cars. 

[4:24] **Stephen**: Yeah, exactly. We're structuring society so that we're just kind of building in the need for more and more, but actually it's not helping us. And this idea of trying to solve a crisis by escalation. I think that was actually a phrase from [Tools for Conviviality](https://en.wikipedia.org/wiki/Tools_for_Conviviality). Again, it really spoke to me about software, this idea that we're always saying, Oh, but the next system will be wonderful.

> "Large-system programming has over the past decades been such a tar pit, and many great and powerful beasts have thrashed violently in it. Most have emerged with running systems--few have met goals, schedules, and budgets. Large and small, massive or wiry, team after team has become entangled in the tar. No one thing seems to cause the difficulty--any particular paw can be pulled away. But the accumulation of simultaneous and interacting factors brings slower and slower motion. Everyone seems to have been surprised by the stickiness of the problem, and it is hard to discern the nature of it. But we must try to understand it if we are to solve it." - The Tar Pit, Chapter 1 of The Mythical Man-Month

[4:43] **Stephen**: And, you know, somehow yeah, the next system will make some things better, but it will make some things worse. And it will be more complex than the old system. And somehow there'll be more costs associated with it. It's almost like Fred Brooks' tarpit, he was talking about a single project where if you don't take care of your technical debt, then you try and put one foot forward, but you're just sinking into the tarpit. And eventually you're stuck. But I think a tarpit on a sort of society-wide scale is really both what Illich was talking about and also what is happening with software. 

[5:16] **Henry**: Almost to the point where he was saying that like anything faster than a bike, we shouldn't even.. Not that we shouldn't have, because clearly he also took flights and stuff. But that if everyone had a bike, that's different from everyone having a car. And he'll bring up like traffic jams. So.. wondering the equivalent of traffic jams?

#### The All-consuming Tech Industry

[5:31] **Stephen**: Well it's an ever bigger and more all consuming tech industry. It's kind of fascinating. I really hate the word tech actually. It's only really come on the scene in the last few years. And I wish we could expunge it from our vocabulary. It's interesting how so many businesses, you know, Uber is some kind of taxi service, but it's tech. And everyone is kind of anxious to be tech, but not to be a part of the domain.

[5:53] **Stephen**: It's a complex phenomenon and I don't want to reduce it to something simple, but it's a sign that technology is kind of starting to dominate the human activity if you like. When people talk about, automation will take over in a lot of sectors, and so there'll be fewer jobs of actually doing the baseline work. But there'll be more tech jobs to sort of be behind the scenes, actually running things. Running all this infrastructure, keeping all the software up to date, dealing with change in the software that's caused by other changes in software in other places and so on and so on. And, well, is it necessarily a better world?

[6:24] **Henry**: That's a good question. 

[6:25] **Stephen**: All of us have grown up in a world where, the march of progress in industry has been kind of an axiom. We sort of take for granted that as time goes by, our technology can do more wonderful things. And to an extent that's true, right? This is why it's quite hard to get your head around. Cause yeah, we do have greater capability, in the same way when we gained cars. We somehow did gain something, but we also lost something once they sort of taken hold in society, and society had sort of adapted in the fullness of what modern car-based society sort of implies. And that's made us poorer. So there's this paradox that having a more powerful capability, once it's deployed across society, actually makes us poorer somehow. 

#### Counting the Costs

[7:06] **Stephen**: And that's a fascinating idea and that's very much the core of Illich's work, certainly his sort of 1970s work. He sort of applied this idea in three different contexts, really. One was schooling, so organized education. Another was health care and the other was transport. 

[7:23] **Stephen**: And it's kind of fascinating that he takes aim.. You know, we get used to modern healthcare. We say, of course that keeps us alive. You know, how can this be a bad thing? And he was arguing well, yes, it does. But how do we add up the negatives, right? It basically allows us to be kept alive in an increasingly unhealthy society. So how do we add up the negatives? 

[7:41] **Stephen**: And he has this passage that I quoted in my talk about how "society can have no quantitative standards by which to add up the illusion, social control, prolonged suffering, loneliness, genetic deterioration, and frustration produced by medical treatment". He doesn't mean all medical treatment. He means that the full machine, if you like, of modern medicine, applied at the society-wide scale.

[8:04] **Henry**: Yeah, it's like the benefits almost, make invisible what the downsides are. And even pointing it out.. Are you allowed to say something bad about education or healthcare? How can you even question that?

[8:15] **Stephen**: Absolutely. And it is a fair question, right? Because Illich is saying, we can't measure the costs, right, and we can't add them up. And then the flip side of that one could quite reasonably say is well, okay, but maybe the good does outweigh the bad? And one of the sort of criticisms of Illich's work is that he doesn't really have convincing quantitative studies. He's just observing. And I think the observations are brilliant. Just the way he writes, it's just so compelling and it's so succinct. He's maybe a better question asker than a question answerer, but the same questions really need to be asked about software as well.

[8:51] **Henry**: Yeah. He came up with this term, [iatrogenesis](https://en.wikipedia.org/wiki/Iatrogenesis), to describe this. Where the application of the institution or what we call the solution, becomes it's own problem. For medical, it would have been like misdiagnosis. He also has cultural and social iatrogenesis too, where if you question going to school or you're a dropout, then you're not considered part of the system. He was saying, we have quantized when you have dropped out, and that also tells you like where you are in society based on like when you left.

[9:22] **Stephen**: Yeah. And that's a fascinating thing, which I often remark on. Like Illich himself, I suppose, I could call myself a heavy consumer of education. And he observes quite rightly that the more you have,  the more shall be given to you. There's very much a rich-get-richer effect. 

#### The Politics of Open Source

[9:37] **Stephen**: And that's a sort of political angle to Illich's thinking, which is that he was definitely inclined towards socialism, but not in a typical way at all. There are both elements of libertarianism and of socialism in which his writing and it's fascinating to sort of tease those out.

[9:52] **Henry**: He feels like he's a "both and" sort of thing, when he brings up this word conviviality, right. Each individual person is unable to kind of pursue their own creative ideas because of dependencies on institutions and services, right. Because you outsource what you could do for other people. And so he wants this kind of autonomy and that's kind of that libertarian part. But then also don't forget that we all live in a society together and that we should be interdependent. And so how do we have both of those?

[10:23] **Stephen**: Right. Absolutely. I think there's another quote that everyone should be free, but not free to take away the freedom of others, which is obviously a finely balanced thing. And that needs to be a society-wide agreement. All societies, I suppose, have that to some extent, but he would argue that we allow too much of taking away the freedom of others, in how we do things in modern society.

[10:43] **Stephen**: And there's a link to open source there, of course, right. Because when I read that, I always think of it Richard Stallman, saying the justification of copyleft is that it's not the best kind of free if others are free to take away the freedom, if you like. So the sort of very liberal BSD style approach to open source where others can basically capture your efforts and then release something that's not free as a derivative of that.

[11:06] **Henry**: It's always been interesting for anyone, including myself, that's gotten into software and open source later and just not even knowing the history, right. We're kind of facing the consequences of that in terms of people getting burnt out doing things for free.

[11:22] **Stephen**: Yep. And it's very interesting how one of the sort of mantras open source is, Oh, well, you know, if you don't like it, just fork the code base and do whatever else you want to do. And that's always a very naive sort of argument because software projects are political entities and you need people to follow you in order for your efforts to sort of be useful and to be amplified. So it's kind of the mythical freedom. There's often a lot of political reasons why that's not going to get you the outcome that you want.

[11:50] **Henry**: Right. It's more like a legal freedom, like you're allowed to. But it kind of implies that you don't have to put in the time to actually maintain it. Or even that you're choosing to take the code and then never contribute it back. But you have to interact with those people. Even the idea of forking sends a message. And it's like, do you really want to do that? You're right, it is very political and involves people. You're allowed to isolate code, but you can't do that in society.

[12:15] **Stephen**: Right, exactly. It just reminds me of the film, Three Colours: Blue with Juliette Binoche, where she tries to cut herself off from society and just finds that whether she likes it or not, her life is sort of intertwined with those of others. Software has this strangely dominating effect though, right? Because if you depend on some software, then you're at the mercy of the person on the other end. They can change things up on you and you just have to dance to their tune.

[12:40] **Henry**: It's funny, cause I feel like a lot of maintainers don't feel like they have a lot of power. But then at the same time we do, every breaking change we make is causing effort on everyone else's part. I guess it feels like you're always in a lose, lose situation. If I don't do anything, people get frustrated because it's not updating. People say, Oh, this project is dead, because they didn't make updates in the last week. That brings this culture of just doing things because it's supposed to move forward.

#### Software Convergence to Pi

[13:06] **Stephen**: Yep. It's really interesting that people take activity as a good thing. I guess there are some exceptions to that. The one I always think of is TeX, the typesetting engine because Don Knuth arranged that the version number is converging on pi. You know, I just love that idea that it's not about endless forward progress. It's about achieving a particular result and just converging on exactly that thing.

[13:28] **Henry**: Wow. That's a really good way to put it.

[13:30] **Stephen**: But, you know, not all requirements are as static as typesetting. In fact, even typesetting is not really static. Certainly in the research community that I'm in, people are starting to ask questions about accessibility. And they're saying, Oh, well, we make all our papers text on a page, but they're not readable on different devices because you got to reflow the text to a different page width, and suddenly the assumptions behind the typesetting system are not really the right ones anymore.

[13:52] **Stephen**: But I guess that's a true kind of progress because it's an essential new need, right? It's not changed because someone changes other things somewhere else, and it's a big, long line of unimportant but necessary changes. It's really the domain and the sort of social context that are moving forward.

[14:07] **Henry**: I mean, you could argue that that need was always there, but the person that made it wasn't aware of that. This is interesting too, whether it's a good thing to kind of incorporate those needs into the existing product, or if it's so different, maybe it needs to be a new project. Is it better to call it a new name or just call it a new version?

[14:27] **Stephen**: Yeah, no, it was a great question. It's definitely one of the themes of software. I guess it's sort of perceived that making a new thing is free. And we often think that progress happens by somebody designing a new system, which makes the old one obsolete. And so everyone switches over.

#### Never Obsolete

[14:45] **Stephen**: But there's some ways in which that doesn't work, right. So I always tell my students about operating systems. I tell them about Unix and I say, basically every operating system is Unix-like, even if it's Windows or MacOS. It's not that we've not come up with better designs, it's just that we haven't been able to eliminate the old design. We just have new layers on top and everyone's still has to in practice, learn and understand the old stuff as well as the new stuff.

[15:11] **Stephen**: It comes back to this interconnectedness with software where so many things are expressed in terms of Unix interfaces and Unix abstractions that, well, we end up just lumping a big system together, part of which is, a Unix. And then we layer on all the other stuff that we care about, but the totality is only getting more complex over time.

[15:31] **Henry**: Hmm. We never truly get rid of the underlying layers then. 

[15:35] **Stephen**: I mean, there will be some exceptions, right? So with hardware.. The Von Neumann architecture, we haven't got away from that. But we have got a lot of different variants where the instruction sets are quite different and the behavior of the hardware is quite different, but we managed to isolate software pretty well in the sense that we can write portable high level code that we can re-target to any of these different CPU's. It's a reasonably clean separation. When we build a new CPU, we don't end up having to ship around the old one. Well, there's some exceptions to that as well.

[16:05] **Henry**: It kind of reminded of Apple's new M1 chip then. It's a lot faster, but the software catches up in terms of how slow it will get eventually. All those same programs still take the same amount of time. 

[16:17] **Stephen**: So you've quite rightly I think, pointed out the flaw in what I was just saying. Once you care about binary compatibility, then yes, suddenly you do need the old CPU or a software implementation of it to be carted around. So I guess it's the differences, right? Well, either way you have a layer of translation, right? So the software implementation, well it's not a whole CPU, it's not like a gate-level simulation of the old CPU. It's a translation layer. And similarly, when we just worried about porting our operating system to some new CPU. Well, we had a compiler that could translate it to that architecture as well. So, having means of translating is kind of a very general thing and we've got it down in certain niches, like compilers. I guess you're all too aware of with your day job.

#### Communicating with Aliens

[16:59] **Stephen**: But there are some other niches where we don't do it. So when I started out in research, my PhD was actually about how to translate between different interfaces. So you have some software that uses one interface, but I want to migrate to using a different library, but that's got a totally different interface. So how can I link my old code with that? And yeah, you could just change all your code and just change the whole thing, port it to this totally different API, but that's going to be too much work. And so can we come up with a better way. And that problem, I didn't make that much of a dent in it. I got one reasonable publication and some smaller ones, but it's very much a problem that is not really on the radar of research at large. And even though it's kind of really old problem, so JCR Licklider, one of the early visionaries of ARPA talked about this communicating with aliens problem.

[17:47] **Stephen**: And it's one that Alan Kay likes to talk about and Bret Victor likes to talk about. I didn't know this at the time, but it's exactly what I was interested in during my PhD. But it really remains a weirdly niche thing. I wish I understood why it doesn't have more currency? I'm not sure.

[18:02] **Henry**: It's funny cause it's just a problem of communication, right and that's always been a problem. Language itself is supposed to help with that, right?

[18:09] **Stephen**: Yeah. It's interesting though. Cause when I explain to people this problem, they often start thinking about translating code. So if we make it really simple so it's about just language level interop. I have a library written in C and I want to use it from Python. Then people say, Oh, well you could translate the Python into C or translate the C into Python. Well, it doesn't really solve the problem. It could be one part of a solution, but in practice, it's just really hard to translate programs faithfully entirely from one language to another. You can come up with an encoding, like if you have a compiler that generates C code, but it ends up being very unwieldy. You wouldn't want to program at that level in order to capture all the details faithfully.

[18:49] **Henry**: Well, you can't automate it for sure.

[18:50] **Stephen**: Exactly. So then you say, Oh, well, how do we actually make this so that people could work at this level? And then you say, Oh, well, a human has to go in and they write all the glue code kind of by hand. So you write a translation layer, but it's very much a labor-intensive process for doing that.

[19:06] So sort of finding a happy medium between those two extremes has been a pattern that my work has revisited from time to time, but there's an awful lot more work to be done in that space. But I feel like it's kind of like an instance of playing Tetris. It's like trying to find the right infrastructure that will make some of the complexity less visible.

#### The Radical Monopoly of the Recent

[19:25] **Henry**: Yeah. I think you kind of talked about the concept without mentioning his term, but like radical monopoly. Actually, you said, tech has been slowly encroaching over everything.

[19:35] **Stephen**: Yeah so it's this fascinating idea of radical monopoly. It definitely spoke to me when I read it in Tools for Conviviality. And he talked about how in the sort of seventies United States, there was a radical monopoly of the car, in that society was designed so that you had to use a car to get around and it was kind of impractical to survive without one. You could do it, but you confined yourself to the fringes. You weren't a full participant.

[20:02] **Stephen**: So I thought what's the equivalent in software. And what I came up with was this idea of change, right. Always working with the latest thing. That's that's to me the most equivalent concept in software, because it's like the monopoly of the recent. If you want to use some old piece of software that you happen to know does what you want. And maybe it's simpler or performs better than some newer version. Yeah, you can do that, but you're confining yourself to the fringes, right? Because suddenly you need to install the old versions of a dozen other things, and suddenly you've got security problems to contend with maybe. Because everything is so interconnected, you've confined yourself to not being a real participant in the software community anymore. So that's this idea that the recent is a kind of monopoly.

[20:48] **Henry**: It's almost like being in the past is somehow not in the community. So it's funny cause we usually think of software as like unchangeable or immutable or it'll last forever because it's code, right? Intuitively it sounds that way, but we all know about like broken links.

[21:03] **Stephen**: Yep. And this is the irony. Like it should be a completely stable thing, right. And yet we make it.. Somehow the way we've chosen to do it makes it unstable.

[21:12] **Stephen**: I do it myself, right. And I was looking at a Docker file that I wrote recently thinking, the first thing this Dockerfile does is do an update. So I'm basically saying, yeah, forget what you know about versions of software that work just whatever the distributor in the package system thinks is stable. Yeah, just trust them. And obviously that breaks all sorts of things and debugging a particular problem that came from that. But we sort of deliberately create a sort of shifting sands that we then build on. It's kind of hilarious when you look at it from that distance.

[21:38] **Henry**: Yeah. And you said like, it's a choice. And maybe it's a choice that we forgotten as a culture. But we just assume that every change doesn't have problems. 

#### The Tyranny of Updating

[21:48] **Henry**: Although I feel like now there becomes a fear in updating too. 

[21:52] **Stephen**: I'm terrified. 

[21:53] **Henry**: It's true at a like operating system level too. Say Mac has a new version, I never want to be on the new version.

[21:59] **Stephen**: Yup. I don't even use a Mac, but you know, every time they release a new version, I get dozens of friends complaining on all kinds of social media about how their machine is broken and everything is terrible. Which is kind of funny. I shouldn't laugh. Sorry. I really sympathize with their difficulties. Because what normally happens with me as I don't reboot my machine for ages, and then I've accidentally installed some new package. I didn't mean to install new things, but I had to install some new thing as a consequence of some other thing. And then everything seems fine, but then I reboot and then nothing works.

[22:25] **Henry**: I'm also reminded of like every desktop program that you have, it's giving you a pop up to tell you to update, right. You have to always click on remind me later. It's like, what if every update we're making just makes things worse? But the assumption, like you said, in the back of our head is that we need to continue moving forward. 

[22:44] **Stephen**: I guess there are some systems that have been really good about compatibility over time. And they tend to be the ones that are also not really evolving in features. So I guess TeX, the type setting thing is one example. I was thinking about the phone network, like just plain old plug your phone into the wall. Although there have been evolutions, it's kind of amazing how stable that has been, but equally we all know that that's a network that is kind of slow to evolve. So I feel like with software, we should be able to get the best of both worlds. It's just an intuition, but it's an unsolved problem. Yeah. 

[23:17] **Henry**: Yeah. One of the symptoms of the radical monopoly is that, you start designing for that monopoly. So for the car, the streets used to be for people to walk on. And now they're mainly for the car, right? The person walking isn't the first class person. I guess the same with the whole updating thing is, all old code is obsolete. 

[23:37] **Stephen**: Yep. The human need is often forgotten, right? We blame the human. We say, well, it's your fault for not updating. And someone could say, well, I didn't update because that was going to break this other thing. Or there might be some perfectly good reason for not updating, but ultimately we always blame the human. We give primacy to the technology. It's really strange, actually.

[23:54] **Henry**: It almost as like a substitute for the human. We ourselves are becoming more machine like, I guess. We kind of assume that what's good for the technology is good for us when that might not be the case all the time.

#### End-user Programming

[24:07] **Stephen**: I do think that commodity software is kind of going backwards in that there was a sort of dream, this idea that, you know, your computer should be a thing that ordinary people can program. This kind of end user programming thing. It hasn't gone away, but I feel like it's less and less mainstream now. So for example, in the early days, you had Microsoft office. Okay, Excel is the survivor. But there were things you could do, like you could write VBA scripts, or you could record macros. There's this idea that the computer is there to help you take the repetitive stuff away from you. And that idea feels like it's just shrinking more and more into the background. The systems that people use nowadays offer less and less of that sort of thing. 

[24:46] **Stephen**: Because I use the most bizarre software.. You know, I'm a hardcore Unix user. Well, relatively hardcore. There's degrees of it. So I'm definitely not typical and I maybe don't have full sight of, what's the typical usage pattern, but I definitely get the sense that this idea that the computer might take away the repetitive tasks from you is maybe more radical than ever.

[25:05] **Henry**: I think you mentioned machine learning in your talk too, but that kind of reminds me of that too. Even the experts don't know what's going on, cause the whole point is it's a black box.

[25:13] **Stephen**: I am kind of in awe of what's been achieved in machine learning. I mean, in awe and also terror. It's changing the rules so quickly about what computers can do that it's quite a scary time to be alive, but I do have a kind of respect for how fast things are being achieved, right. Just recently with the protein folding successes, it is very impressive. 

[25:34] **Stephen**: And I do think that when things stabilize, we are going to have to contend with this idea that maybe if there's a function we're interested in, then there's maybe two basic ways of making that function be a thing we can compute.

[25:46] **Stephen**: One is to define a function in some kind of programming language as we do now, another is to learn the function. And I'm kind of comfortable with that as long as we know the limits or the downsides of each. But there are a lot of things that make me uneasy. At least the kind of energy usage you're coming back sorta full circle back to the seventies where, you know, how much energy is if we take this approach to the extent that it naturally goes, then do we end up burning the earth to power our computers to predict something not very interesting or that we would have been better off not predicting in the first place.

[26:23] **Henry**: Yeah, it's a difficult question. Because people that are pushing that forward would also be like, well, I don't want to limit other people's creativity. We also don't want to do things just because it's useful, right. Like doing things for fun or doing things because there's a passion for it. And then later that results in something helpful, but like what is a waste of time, really?

#### Thresholds of Automation

[26:43] **Stephen**: In the age where, you know, there's so much promise of automation, there's this big question of what is a good thing for human beings time to be spent doing? Maybe jobs that could be automated, actually, maybe having a human do them is still a good thing because it might make people feel better, feel more connected.

[27:00] **Stephen**: There was an anecdote. I went to see the Watersons, a very famous British band of folk musicians. And one of the older musicians at the time -- he has sadly died now -- Mike had this anecdote about a drinks vending machine, and he was just ranting about how he really wanted to be served his cup of tea by human being. And that would've made him enjoy his tea a lot more. And I think we have this sort of question now, the more we can automate, the more we need to ask, should we?

[27:22] **Stephen**: Cause what our people for? And this is something Illich would also wrote about a lot, you know, being able to do things with under your own energy that do something useful for yourself or for others. It's very much, you know, what makes life worth living? And so automation is not, it's not sort of an automatic good, right?

[27:39] **Henry**: I think that's a great philosophical question, what is the good life and how should we live? Tech usually it doesn't or tries to stay away from those questions. And just to say that no tech is the thing that is good. And actually Illich talks about a distinction between what is good and what is valuable. And I think that's kind of hard to piece out, but for him, the good has limits and values don't, right. Meaning that infinite money or infinite energy versus good in terms of like how people used to think of good is sort of like the virtues, right. It's like that golden mean of like.. So one example I use is like courage is in between recklessness and being afraid, right?

[28:22] **Stephen**: Yep. And that is very much a theme of Illich isn't it? How he talks about these thresholds, where with medicine, he was saying that medicine went through these two thresholds. Where one was in the early days, like 1913 was this first.. He called it a watershed, sorry, not a threshold, where, it crossed this point where modern medicine was likely to deliver a treatment that was more effective than just whatever your local quack, you're non-qualified doctor might come out with. And after that point, it still progressed, but it became a point where there was a second threshold, actually it was according to him delivering net harm. 

[28:55] **Stephen**:And it's exactly that sort of idea of recklessness versus fear or timidity, finding the balance. And as a society, we're not very good at finding these balances. We were very good at continuing on a trajectory that gains a lot of momentum.

[29:09] **Stephen**:And this is what Illich talked about with disciplines being good at defining metrics by which their own successes later measured. So that's how they sort of sustain themselves even past the point where by rights, we should be saying, hang on a minute, this isn't helping our society, but we've already defined success in terms of, you know, this particular discipline's notion of progress, which is not our human value, if you like. I think I probably mean our good, not our value. So we have to be careful of allowing the metrics to be set for us, I suppose, rather than relating them to sort of human first principles. 

[29:43] **Henry**: Yeah. That ties back to like escalation and radical monopoly, where like the thing that succeeds is able to set the terms. And we submit to those terms because we've seen the success, right. And then they continue that success and that leads to confusing the ends and the means where like, they're not actually helping us anymore, but then we've relied on them so much. We can't help but defer to them.

[30:10] **Stephen**: And that is a very human failing, I suppose. Cause we're good at recognizing patterns and at forming associations based on our experience. But our experience is limited. And actually when we exhaust the relevance of those patterns, we can't just notice that in an instant. It's something that takes a lot of reflection or later experience to sort of reveal that we sort of overgeneralize, over applied those ideas.

#### Software Slogans

[30:33] **Stephen**:And we do it with language as well. I wrote an essay a few years ago on types, right. Types in programming languages and how actually there's kind of a pun. There's a lot of instances of people basically talking about types in the wrong way, because they've over applied this sort of link. There is a link between sort of types in the sense of logic and types in the sense of data in programs, but there are ways of getting confused by overplaying that sort of deliberate pun.

[30:57] **Henry**: Oh, it's kinda like when we learn various paradigms and that becomes the lens through which we see everything. Everything is a function, or everything is an object. Don't repeat yourself. It's hard not to think that way, when it feels like it's working, right.

[31:11] **Stephen**: Yeah, we like simple rules. There's a lot of slogans in software, right. And the slogans are kind of like little bits of folklore and we summarize them down into a slogan, like don't repeat yourself. When actually the reality is always, well, generally don't repeat yourself, but actually there are some cases where repeating yourself is perfectly fine and a good idea relative to the alternatives, but that's not a very nice slogan. It's very human to sort of need these rules of thumb and these little bits of wisdom. It's just that we have to catch ourselves when they're not helping us.  

[31:39] **Henry**: It's like this, inclination to want to codify right. I think that's what technology is about. It's about making these artifacts that kind of have the tradition and culture that we have. And this is what he talks about too with convivial tools. We kind of learn to depend on these things eventually to the point where machines know us  better than ourselves, right? The algorithms, right? What we're supposed to eat, what we're supposed to watch, what we're supposed to wear. To the point where like, we don't have to make decisions anymore because the machine will make it for us.

[32:11] **Stephen**: Right. And then will we really be human?

[32:13] **Henry**: Yeah. We're making things such that we won't even be confident in ourselves anymore. 

[32:18] **Stephen**: The thing you mentioned with rules is really interesting. People want a need rules to live by. And it  reminded me that when I've talked about Illich's ideas to some people, they've been skeptical cause you say it's better to do without this powerful technology. And then people say, well, how can you persuade people to not do that? It's basically kind of an abstinence thing. We have to say, no, don't do that. It's for the best really. And you know, actually, that's kind of a fragile thing. It's not going to be a stable, but then you remember that actually humans are very irrational, right? So there's all sorts of rules we live by that we can't justify and we rely on it being a kind of cultural imposition that says.. Oh, I should have an example.

[32:57] **Henry**: You mean just like, folk anything, right? Or superstition. 

[33:01] **Stephen**: Exactly. Superstitions, folk customs. 

#### Corruption of Christianity

[33:04] **Henry**: Actually, I wanted to bring up that Illich was a Catholic, right. Where did his religious background fit into all his thinking? It wasn't just kind of abstract. It was kind of at the core of it actually. So I read this book called rivers North of the future. And he mentioned a parable in the new Testament that Jesus says, the good Samaritan. I'm not sure if you're familiar? 

[33:26] **Stephen**: Yeah, I know the one.

[33:26] **Henry**: To me, this does explain a lot of why he criticized institutions. He says that a lot of people think either that Christianity is the epitome of modernity, right. Or they think it's the antithesis of modernity, right? All that is good and all that is bad. And for him, he actually thinks it's what he calls the corruption of Christianity.

[33:48] **Henry**: And the good Samaritan is about.. The person sees the person on the side of the road and they help them. But then if you think back to why he even said the parable, the person was asking, who is my neighbor right. And so, most of us take away from that story that we should help people that are on the side of the road, meaning that everyone is my neighbor.

[34:09] **Henry**: But for him, his interpretation was no, it's not that necessarily that everyone's my neighbor, but that the person on the side of the road, I have compassion for them. I feel for them. It's a very personal, intimate relationship that I have, such that we should help who we choose to help.

[34:25] **Henry**: The corruption is that you take the personal choosing of helping and turn it into an institution. And  it's like, okay, we have hospitality, right. Helping someone. But then we turn it into a hospital, right. It's like, we need to help everyone. So let's just create an institution that helps everyone.

[34:45] **Henry**: And I wonder if that's kind of the idea. It's a good thing, right? Like escalation and technology and medicine school. These are all really good things, but what we've done is saying that, you know, everyone needs it and that's not a bad idea, I guess. But then in practice, what we've done is caused more harm by choosing to make that for everyone.

[35:06] **Stephen**: Yep. And that is really interesting, how once you've make an institution out of something, it takes on a life of its own and it doesn't have to stay true to the original purpose. I don't know if that's a fair summary of..

[35:18] **Henry**: Yeah. Yeah. And I think that relates to conviviality. The good Samaritan is a one on one type of interaction. It involves hospitality and friendship. But I think that it's hard, even for us to think that a company or an institution is friendly or hospitable. You don't want to consider the company a family. I think the company has incentive to try to make it that way, but I don't think anyone wants that necessarily right.

[35:44] **Stephen**: And it's often the more a company tries to be like a family, the more it's kind of alienating.

[35:49] **Henry**: So I just thought it was interesting, he cares so much about this personal aspect of it. And if you think about tech, right, we're all just trying to scale.

#### Need to Care for One Another

[35:56] **Stephen**: Yep. In one of the seventies books, probably Tools for Conviviality, he talks about how unsophisticated societies, people do a lot of things for themselves. I think one of the examples was they bury their own dead. He had a whole list of the things. These are things that people would do directly, for their families, their loved ones. They were somehow self-sufficient. And when the more you institutionalized, the more you separate people, even if the institution is actually trying to help people. It's trying to take away the burdens of whatever the task is. It actually ends up distancing. 

[36:26] **Henry**: Yeah. And in that particular case, the burden, in some sense is the thing that we need, maybe. To take care of our family. I think about like the nursing home, right? It's a place where they are separated from their family and you kind of visit them. Even back then, when someone passes away in your family, everyone lives in the same place. And so it's like, you knew it was coming. And people have the time to be able to kind of, you know, just go through that process, right. But now given that everything's global, a lot of your relatives and grandparents or parents even don't live in the same country maybe, and you get a phone call that like they're sick or they passed away.

[37:05] **Stephen**: Yep. He writes about in one of those passages how we feel. I think he calls it harriedness. That  we're constantly hurried. We feel constantly put upon, we have very little time. I do feel like the scarcity of time that we all feel is to large extent something that our society has created. Feel like we create more tasks for ourselves then are really important. And this idea that, well, we don't have time to look after our elderly relatives anymore is another instance of that.

[37:31] **Stephen**: Our society has conspired to keep us busy, and give us the feeling that we don't have time. Not just the feeling, you know, the economic reality that we have to spend more time on other things in order to not starve. But either way it doesn't feel like an essential scarcity. It feels like one that that's been constructed.

[37:49] **Henry**: Hmm, a manufactured scarcity. If we ever take the chance to like fast from being online, and then you don't use the computer for a week and you're like, wow, time's moving so slowly. 

[38:00] **Stephen**: But then the flip side, I guess, is our friend radical monopoly where social media almost has a radical monopoly on a communication and connection with people now. If I want to be invited to the cinema with my friends, then if I'm not on the same social network, they're probably just going to not going to send me the message. So that's kind of terrifying. We've always been dependent on some means of communication..

[38:22] **Henry**: Yeah. You familiar with McLuhan? Four laws of media. He talks similar to what we were saying about how like technologies include stuff, but then also forgoes stuff. And he brings up the idea of perspective, right. Each media has a certain lens, right. And so by focusing on something, you're also not focusing on something else. So something is lost. His famous phrase, right? The medium is the message, the environment through which content is presented. 

#### Monasticism and Child-likeness

[38:50] Actually later in his life Illich got really interested in doing research into the history of the senses, like our taste and our smell. And how the book changed, how people read, And so how has the screen changed how we read.

[39:05] **Stephen**: Yeah, no, I see this sort of effect a lot, where things are designed to be read in the medium that they're presented in. And that can have a radical effect on how they're written. 

[39:14] **Henry**: And he brought up monastic reading versus scholastic reading and how even in the book, it treats the words as isolated things. Versus before people read in prayer, in meditation, out loud even. Reading was a way of life for them even. And now it's just like a way to get information. It's funny cause I see a little bit of interest in that again.

[39:36] **Stephen**: It's one of those things that always seems appealing. I mean, people sometimes describe academia as a monastic existence. It's not really, but. Well it has had elements of that. I think it's less and less the case nowadays. But it does have some appeal to me, whether it's actually true of a monk's existence or not. Well, we can't really afford to ignore the outside world, especially at an institution where people are constantly flowing in and out. And you kind of have to justify your existence to them. But in a sense, the true spirit of research is somewhat monastic and that we cleave to the truth and we care about learning often for its own sake.

[40:15] **Henry**: I've been thinking about that a lot, the whole for its own sake. And that the feeling that I don't feel that way about almost anything.

[40:21] **Stephen**: There must be a purpose to any action that you take. Because time is precious, life is short, and money is scarce and all those sorts of things.

[40:30] **Henry**: But I also see a response to that in terms of people that write books about leisure or rediscovering through video games the power of play. Without turning into  gamification, like plus ones.

[40:40] **Stephen**: Right. It's one of those things that as adults, we forget. and that is a sad thing. Especially when often children don't really realize. Yeah, it's the classic thing that you don't realize what you have at the time. So it's kind of illusory to say that, Oh, children are so lucky because blah, blah, blah. Because you know, when I was a child, I was frustrated that I wasn't grown-up and I couldn't do proper things. And was sort of limited by my childness and now going back to all that has some appeal, but it doesn't really make sense.

[41:07] **Henry**: It's kind of like this phrase of not being childish, but being childlike, if there's a distinction between innocence, but not being naive.

[41:15] **Stephen**: Right. Being able to look at the world through a suitably childlike eyes where it's constructive. Even the word constructive, it's like, a lot of industrialism. Does anything good have to be constructive? but yes, where there's value in, doing so. 

[41:28] **Henry**: I think of words like wonder and awe. Things that are not measurable and trying to embrace this art, like poetry. what is the equivalent of that in programming?

[41:39] **Stephen**: I guess we do have the advantage that we use our imagination when we're programming. To greater or lesser extents. Sometimes the imagination leads you astray, because you can get wrapped up in visions of the thing you want to build and end up not building as much as you would if you were more hard-headed. But I certainly think most people who do great things in software are driven by a strong vision. And I don't just mean vision in a sort of corporate sense, but literally that their creative juices bring images into their mind. And that is guiding them towards the thing they want to build. Thanks for the chat, this was fun.
