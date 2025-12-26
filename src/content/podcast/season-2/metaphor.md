---
title: "Embodiment Through Metaphors (Maggie Appleton)"
season: 2
date: 2020-05-13
time: "54"
description: Is programming all digital or do we still have embodied roots? How
  does this affect how we write, teach, and learn code? Maggie Appleton joins
  Henry again to discuss everything metaphors (basically everything). We chat
  about mental models and abstraction, Polanyi, Cartesian dualism, auto
  ethnography, knowledge, cats!
episodeLink: https://anchor.fm/s/ff707650/podcast/play/96461588/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-11-31%2F392345541-44100-1-fd19bf89100978a9.mp3
embedUrl: https://podcasters.spotify.com/pod/show/hopeinsource/episodes/MA-12-Maggie-Appleton-on-Embodiment-Through-Metaphors-e2su9ak
sidebar:
  order: 12
---
### Show Notes

- [Building a Second Brain](https://www.buildingasecondbrain.com/)
- [Metaphors We Live By](https://en.wikipedia.org/wiki/Metaphors_We_Live_By)
- [Cognitive Metaphor Theory](https://en.wikipedia.org/wiki/Conceptual_metaphor)
- [Michael Polanyi](https://en.wikipedia.org/wiki/Michael_Polanyi), [focal subsidiary integration](https://en.wikipedia.org/wiki/Michael_Polanyi#Tacit_knowledge)
- [The Body Keeps the Score](https://en.wikipedia.org/wiki/The_Body_Keeps_the_Score)
- [Programming as Theory Building](https://pages.cs.wisc.edu/~remzi/Naur.pdf)
- [What Games Are Like For Someone Who Doesn't Play Games](https://www.youtube.com/watch?v=ax7f3JZJHSw)
- [Gonzo journalism](https://en.wikipedia.org/wiki/Gonzo_journalism)
- [auto ethnography](https://en.wikipedia.org/wiki/Autoethnography), [etic, and emic](https://en.wikipedia.org/wiki/Emic_and_etic)
- [20 Years of JavaScript](https://bookbye.com/read/20-years-of-javascript/)
- [Purity and Danger](https://en.wikipedia.org/wiki/Purity_and_Danger)
- [dead metaphors](https://en.wikipedia.org/wiki/Dead_metaphor)
- Tim Rohrer
- [The Medium is the Message](https://en.wikipedia.org/wiki/The_medium_is_the_message)
- [Natural Born Cyborgs](https://maggieappleton.com/cyborg-history) ([Andy Clark](https://en.wikipedia.org/wiki/Andy_Clark))
- [cybernetics](https://en.wikipedia.org/wiki/Cybernetics)
- [anthropomorphization](https://en.wikipedia.org/wiki/Anthropomorphism)
- [The Cat and The Toaster](https://www.goodreads.com/book/show/42601482-the-cat-and-the-toaster)
- [The Death and Life of Great American Cities](https://en.wikipedia.org/wiki/The_Death_and_Life_of_Great_American_Cities)
- [How to Talk About Books You Haven't Read](https://en.wikipedia.org/wiki/How_to_Talk_About_Books_You_Haven%27t_Read)

[00:00] **Henry:** Hey everyone, this is Henry for the Maintainers Anonymous podcast. I have with me **Maggie Appleton**, again! And here we want to talk about this idea of metaphor, I think we mentioned that at the end of the last episode. And I know that Maggie, you just did like a talk about metaphors and embodiment.

[00:14] **Maggie:** So, last time we chatted, we had mostly talked about **gift economies** in relationship to open source stuff, and then started to talk a bit about how metaphor and embodied metaphor relates to programming. And I, yeah, I had just done a talk the other week about how embodiment and metaphor relates to something called **Building a Second Brain**, which is a strange theory, which just essentially means being a nerdy, information collector, social community we have of people that are really into taking in notes and collecting everything that they research and turning it into useful output of some sort.

[00:46] **Maggie:** And because it's called _Building a Second Brain_, I got a bit into where ideas of body and brain come from. And the history of [René Descartes](https://en.wikipedia.org/wiki/Ren%C3%A9_Descartes), who is a French philosopher kind of initiated the original idea that all minds and our bodies are separate, which more modern science has proven to not be completely true.

[01:04] **Maggie:** And I think we all understand that, you know, that's problematic in lots of ways. There's all these ways that the body affects the brain and the brain affects the body, that they are perhaps not two separate entities connected, but are instead one cohesive system (laughs). But the historical legacy of that stays with us and it causes some problems.

[01:20] **Maggie:** And I think this relates a lot to programming, cause it's such a cerebral process. And yet from my understanding of it, like the way that we program and build things is very physical and embodied, especially in the metaphors we use to work with it.

[01:35] **Maggie:** So yes, we started to get into a bit a theory called **Metaphors We Live By**, which is a book that, [George Lakoff](https://en.wikipedia.org/wiki/George_Lakoff) wrote, and [Mark Johnson](https://en.wikipedia.org/wiki/Mark_Johnson_(philosopher)), his coauthor, who probably doesn't get as much credit for it (laughs). He's always hidden. And yeah, so he came up with this theory, I think it was in 1991 this book was published? And it established a discipline called **Cognitive Metaphor Theory**, which is this idea that everything about the way we reason in the world, everything about the way we think, everything about the way we move is metaphorical.

[02:06] **Maggie:** Which is a bit difficult to understand. So if we back it up a bit and talk a bit about metaphor, you know, it just simply means understanding one thing in terms of another, right? So that's like the very basic definition. And we usually think a metaphor is something that lives in like literature and poetry, right? Or it's like some fancy thing you put at the beginning of an article to make it more interesting than it is, right? Like every programming tutorial it goes, "Oh, well, here's how like RxJS is like a big pile of cars or something." And it seems very, you know fluffy and artistic and tangential to the point sometimes.

[02:40] **Maggie:** So that's what we would call **figurative metaphors** when they're more poetic and artistic, but Lakoff and Johnson came up with this concept of **cognitive metaphors** or conceptual metaphors, which are kind of like lower level. So it would be the more, you know, like machine code to the abstract JavaScript, which would be your figurative, but it's the lower level, metaphors that build our world. And these are all related to the body.

[03:07] **Maggie:** So they say we experienced the world first and foremost through our physical bodies. You know, we are embodied beings and we cannot not be. And so everything about the way we think is about front, back, left, right up, down, inside, outside, containers, substances. Like there these core sort of ingredients.

[03:27] **Maggie:** And we use those to project upwards onto more complex metaphors, but they form the basis of everything we think about. So for an example with programming, we think of files as containers, and our code is a substance that goes into the file, and you can also have overlapping metaphors.

[03:43] **Maggie:** So we can say that's one way to think about code. But of course that's when we get into different paradigms of programming. You can say, you know, reactive programming is like a stream and we have to change our metaphor in order to understand it. And a lot of programmers would understand this is **mental models**, right?

[03:57] **Maggie:** That's the programmer word for metaphor? But yeah, it's just that we're using these basic concepts to reason about the world. And once we can see those metaphors, we can sort of look at them closer and break them down and dig into how they work. And it helps us understand how we reason through things. So that was a bit of a light introduction to the whole idea.

[04:17] **Henry:** Yeah that sounds really good. Just like the way we have the different paradigms we say like object oriented, we think everything is an object or functions. Everything's a function. But then I guess with RxJS, maybe it's like pipes and streams and we use those metaphors?

[04:29] **Maggie:** And I'm not sure.. We'll see I'd be curious to hear whether how much you perceive programmers actively build those, I suppose new mental models? I don't know if people think about those a lot.

[04:41] **Henry:** Right, so maybe it's more that for us to understand that we all have mental models, but we might not think about it. I think this is sort of like what I was trying to say in some of my talks I gave about abstraction, where it's like, you know, we are relying on the mental models, but we're not thinking about how they work.

[05:00] **Henry:** And so that means those mental models are **abstractions**, because when you're using the abstraction, you're not thinking about how it works because someone else wrote that code for you. They wrote the library. And you don't have to understand how it works because you'll need to understand how to use it.

[05:14] **Henry:** But then of course, when you inevitably find that bug or you know, something happens, right? That you don't expect. That's when you're.. I guess your mental model is tested to see if it matches the thing that you're using right?

[05:27] **Maggie:** Right, right. Cause. Yeah, you could imagine someone building a library and they have a mental model in their head of how this code fits together and how it works, but they haven't made it explicit in the documentation or they haven't recognized it themselves. So then they might just show people the surface level documentation, right.

[05:42] **Maggie:** Here's how you wrote a function. Here's how you wrote loop. But if the person reading it doesn't have the same mental model as the person who wrote it, that's probably what you're getting into why people misunderstand how certain things work and why it's difficult to learn, right? Like reactive programming is infamously difficult and like functional programming is infamously difficult to learn if you're coming from object oriented because you're trying to switch metaphors and no one is very explicitly talking in metaphor land. They're very much talking in syntax land.

[06:10] **Maggie:** Cause that's where I love bringing in visuals. It looks like I'm an illustrator, but I would much prefer my job title was something like metaphor investigator, which is kind of douchey.

[06:21] **Henry:** Oh, you can name yourself that, I guess.

[06:23] **Maggie:** I know I can pick whatever the type, but you know, it sounds a bit egoistic, but something to that extent where much more of what I'm doing most of the time is trying to figure out what the metaphor underneath the language is and then of course, draw it so that it's visible and easy to see. But yeah, I'm much more interested in investigating metaphors and creating them than I am about like, you know, using certain pens on paper or that sort of, you know, physical drawing. It's a medium, but it's not the thing itself, you know.

[06:52] **Henry:** Right. Right. In my talk, I mentioned this tweet from Justin Falcone. He basically wrote about Redux and how a lot of people complain about the boilerplate or basically why you have to do certain things. And so he was saying that just like what you were saying, that frameworks reinforced their mental models through the code.

[07:08] **Henry:** So his example was if you use Rails, then you are unavoidably or inevitably writing code like DHH, the creator, would write and that his view of how code works or even his view of the world is like in the framework itself. And so maybe the reason why it's hard to use Redux is because people just don't get it, they don't understand. They don't believe in the ideas of it. And so it's up to the framework people to figure out how to explain it, word it in a way that helps people understand that underlying model.

[07:41] **Maggie:** Yeah. Cause that's why I'm always amazed that documentation never has many visuals to it. Like I always, I'm someone that always needs a diagram, right? I always need to see, you know, okay, if we're working in React, I need to see something like, okay, it's a tree of components and they have downwards data flow. Right? Once I see the diagram, I get it. And I feel like most people like that. I don't think I'm unique in that regard.

[08:02] **Maggie:** But on any documentation for any thing I'm trying to get my head around, I'm constantly scrolling, just being like, but where are the pictures? Like I don't get it. What's your model?

[08:10] **Maggie:** So, yeah, that's one way. Or maybe it is, you know, there's barriers to creating a visual diagram. Sometimes even just tool-based people don't know quite what to use. But I would love to see more documentation and, frameworks if anyone needs help, get in touch!

[08:26] **Henry:** Yeah, for sure.

[08:28] **Maggie:** Even if it's just simple boxes and arrows, you're just saying like, okay, we have a container and we have things in a container and they're flowing through. So we understand we have a substance and we have to.. Cause what I love about drawing this stuff is you have to explicitly think through the spatial relationships that you're imagining in your head. So if I say I'm going to draw a React component, you know, two or three.

[08:49] **Maggie:** I have to say are they next to each other? Is one above the other one? Is it to the left? Is it to the right? Is it smaller? Is it bigger? Like it sounds a bit daft sometimes to ask those questions when what you are dealing with is abstract code, right? That's why it's lovely and faster, right? It wouldn't be efficient to actually do the visuals, which is why Visual Basic didn't work. But, when it's in syntax, you don't have to figure out what's above what and where it exists in time and space. And when you have to really do that, it forces you to think about the relationship between two objects much more explicitly. So that's why I find it more useful for learning the stuff.

[09:27] **Henry:** I see. So like asking those questions about space, like where am I or where am I in the code is like something that maybe because of the way we write code is just focused on that, that line that you're looking at. Otherwise we would look at functions and imports and exports, but otherwise we don't know what the relationship between anything is.

[09:44] **Maggie:** Yeah, especially with beginner content, I find this is missing a lot, the relationship of time to everything that you do with code. That usually doesn't get explicitly talked about. It's very implicit. If you have to explain state to people. Or you have to explain, you know, props being passed into a component or something of that sort.

[10:01] **Maggie:** I remember in the beginning constantly asking like, well, okay, but where are props? And like where is the DOM? And like, when is this code running? And like what the user interaction, and I needed a timeline of sorts and I wanted spatial relationships because it kept being like, I'm just typing code in a linear line in this file.

[10:21] **Maggie:** But I don't understand where that code goes, I was missing so many material dimensions because all we know is the physical world. If you're coming to programming as a new programmer, and dealing in with abstract world is gets quite difficult. Yeah.

[10:37] **Henry:** So maybe coming into programming with the other background, it helps you to ask these questions of why do we use all these abstractions? in my talk, I was trying to say sometimes we rely too much on those abstractions. But how do we balance that? Because if we didn't have any abstractions, then we have to do everything from scratch.

[10:55] **Henry:** My equivalent was seeing how being skeptical of that is like, kind of not trusting other people or trusting yourself. That's kind of like the skepticism of Descartes, right? I can only discover truth by myself because I don't want to essentially take someone else's belief as fact or opinion.

[11:11] **Maggie:** Cause yeah, the abstraction of course, it is necessary at some point, right? Like once you understand Redux, you don't need to constantly rebuild that. Every time you use it, you just know it. Like I know you're big on tacit knowledge and [Karl Polanyi](https://en.wikipedia.org/wiki/Karl_Polanyi) who I haven't heard as much of, but was your, in your talk, where you talking about that, understanding of certain code becomes tacit?

[11:29] **Henry:** Oh and first, it's [Michael Polanyi](https://en.wikipedia.org/wiki/Michael_Polanyi) because he has a brother Karl. They're both, he's a lot more well known actually. But yeah, I guess I was just saying that, my talk was more just this idea that I think that if we do use abstraction, rely on it, it might cause us to not think about who maintains the dependencies or the abstractions that we use.

[11:51] **Henry:** And obviously I'm trying to refer to open source maintainers, but you can apply that to everything, right. We were talking about, I mean, just what's happening right now, the environment. When we act simply as consumers of whatever it is, whether it's code..

[12:05] **Henry:** Like consumers of a library or consumers of food or whatever it is, you don't have to think about how any of this stuff works. And what happens when these things stop working? Are they needing to be maintained? Like all that right?

[12:17] **Maggie:** Interesting. Yeah, I'd never thought of that before. When you use, I mean, so the big thing with **Metaphors We Live By** is they talk a lot about language is really the driver of our cognitive metaphors. It both exposes them, right? We can look at the way we use languages, the best insight we have into our metaphors, but also how usage of certain words.

[12:35] **Maggie:** Then we'll of course, you know, the two effect each other, will frame all metaphors. I had never thought before about that. That idea of the consumer of a library. And so you're not, you know, a co-builder of the library and like a collaborator of the library. Like imagine if we said, anytime you, you know, npm installed a library, we use the label that you're now a collaborator on that library and have obligations to it.

[12:56] **Maggie:** Which would be a really interesting reframing instead of, I mean, I bet you at borrowing consumer, of course, from the capitalist model as if it's a product and sort of buying it off the npm shelf,

[13:06] **Henry:** Right. Even though it's free, right? Yeah.

[13:11] **Maggie:** Yeah, that's when the gift economy stuff gets interesting is if people misunderstand the, the idea of the gift economy, that they think of it as like, Oh it's, you know, npm's a gift economy. People just give me gifts. But when we talked about in our gift economy chat was a gift economy is a relationship where, and with every gift you receive, you all oliged to reciprocate. And that's where there's a little bit of something broken in the current open source gift economy where it's either not small enough or it's not human enough, or it's not embodied enough where we've lost that understanding of what it means for it to be a gift economy. Yeah.

[13:46] **Henry:** Yeah, I guess I was just thinking around like. Does abstraction lead to people not caring about people? Just inevitably.

[13:55] **Maggie:** Yeah. I can see that actually, so with abstraction and then the maintainers of open source become invisible right? And, okay this definitely does tie into the metaphors that the more fundamental metaphors of how we think about the internet, and digital wealth in general. So, however culturally evolved, right? Our base understanding of the internet is very much as a nonphysical space, right? It's disembodied from the beginning, right? Cyberworld. You know, live in pixels. Like,

[14:22] **Henry:** Hyperlinks, yeah.

[14:24] **Maggie:** And so even though the internet is a terribly embodied, there are certain ways we talk about it in space.

[14:28] **Maggie:** So, you know, the cloud, we know is above us, right? That's unquestionable. And we know we are below it and we download things. Right? So that's very clear. We're below. The future links we're going to go to are to the right and links we've been to are to the left in the past. That's, uh,

[14:43] **Henry:** history.

[14:44] **Maggie:** Yeah, exactly, history. And that even builds off a more lower level, metaphorical understanding of time, which ours is very Western. Like, this isn't, culturally universal, but we think the future is to the right, and the past is to the left. And we also think the future is behind us, and that the.. Oh, no, sorry. The past is behind us and the future is in front of us.

[15:03] **Maggie:** We'll say next week is coming up, Oh, let's just, you know, that was a bad argument. Let's put that behind us. So when we speak about time, we situate it in time and space, but it's not a universal, there are cultures that, it honestly, it makes more sense. They talk about the past as being in front of them because they can see what's happened and the future is behind them because they can't see it.

[15:23] **Maggie:** So it was much better. That was a.. I'm going to not get the name right, but as an aboriginal culture that uses those words, And then we've, built the way we speak about the internet on top of that more fundamental metaphor. So, yeah. So there's all these ways where we very much think that the internet has physical space to it, right?

[15:39] **Maggie:** Like pages are locations. You go to a page, you visit it. We also think it has depth, right? You can go down a rabbit hole, like a Reddit thread, or you go deep into it or something. So there's all these ways where there's certainly physicality to it, but we insist on talking about the digital world in a very disembodied way. You know, it's the, the whole thing of like, well, even now, right, we're in a moment in history where we are all physically bound to be inside all houses for a while for public safety. And we are all, you know, able to project ourselves despite all bodily, you know, restrictions into each other's rooms and talk, and, you know, that's the point of the internet.

[16:19] **Maggie:** So then you understand why the disembodiment rhetoric starts up, but then, because of that we forget how that were still embodied beings. It's the stream. If we want to be the brain in the machine, you know, that we want to just like leave off physical body behind and become, you know, the transhumanist movement.

[16:35] **Maggie:** Yeah. Like they're all hoping the singularity will hit and they will upload their brain to the cloud into Dropbox. And they will be, you know, rid of their inconvenient body. They have to feed and move. And..

[16:49] **Henry:** Yeah. I heard a talk about it at work before, where one idea was like after you upload your consciousness or something, you would create like little, I guess ships or something that are solar powered and then everyone gets their own like little simulation universe. And then you don't have to interact with anyone because you get whatever you want or something, I forgot. Yeah.

[17:10] **Maggie:** I mean, it is, you understand where that dream comes from culturally, right? We, we've always been, so this comes back to Descartes a bit. He split the mind from the body and him and many other thinkers who came after him that they made very clear that the body was sort of our more animalistic nature.

[17:27] **Maggie:** And it's associated with emotion and it's associated with nature. Whereas. The brain is associated with reason and culture and higher thinking. And we think the body is bad and the brain is good. And we would vary it, and we constantly trying to like control our bodies with like our reason. So there's a clear hierarchy intention to them. In a ways, the internet is sort of like this taken to an extreme where we're all trying to live in the cloud and deny our physicality.

[17:53] **Maggie:** Which is problematic because the research that Lakoff and Johnson ended up working on for like the next 20 to 30 years, after they had originally done _Metaphors We Live By_ was very much about how reason is embodied. So, you know, they had started on this train of thought, but they had started working with more neuroscientists and really, you know, got into how metaphors are embedded in neurons in your brain. It's very physical.

[18:16] **Maggie:** And they found out so much of the way that we reason and think about the world in what we would consider our logical way is spatial. And it's completely linked to our bodies and our emotions. And there is no, you know, there is no separation of mind and body is like the punchline.

[18:32] **Henry:** Yeah I keep seeing like that kind of statement or feeling in all these different kinds of disciplines I suppose. Like I, skimmed, but like I read a book, that is called **The Body Keeps the Score**.

[18:44] **Maggie:** Oh yeah.

[18:45] **Henry:** And it's like about, well, it's more about like trauma and stuff, but in a way, it's trying to say the same thing that once someone goes through something like that, they're literally like, their body will remember, you know, the body quote unquote, keeps the score, of what's going on.

[18:58] **Henry:** And so you can't remove that. It's not all psychology, right? Like all in your mind right.

[19:03] **Maggie:** Yeah, so, so I haven't read that book, but I've heard many people talk about it and say it affected them quite deeply. The book sounds like it makes perfect sense, but it is even funny that we needed a book that sorta pointed out that this is, you know, groundbreaking and people are like this guy is, just an incredible thinker. And all he really said was like, Hey, there's no division of mind and body.

[19:24] **Henry:** Yeah.

[19:25] **Maggie:** Uh, and there'd been quite a few books in that vein that have, I mean, anything, right? Like, psychosomatic medicine became very popular at some point, and they're all trying to get at the same thing. And yet at the same time, eh. All the ways we speak about, the brain and the body keep reinforcing **Cartesian dualism**, which was the original Descartes' theory. That mind and brain is separate substances. And I still see it, you know, and so much in programmer culture and the, yeah, the denial of the body in certain ways and the glorification of the mind. More than, more than other professions or communities. Programmers seemed very on board with that.

[20:03] **Henry:** Yeah. The essay I mentioned in the talks I've been doing, it's called [Programming as Theory Building](https://pages.cs.wisc.edu/~remzi/Naur.pdf). And in a way, theory building is just mental models. So there's just saying that too. That's [Peter Naur](https://en.wikipedia.org/wiki/Peter_Naur). He wrote this in 1985, but essentially the first sentence..

[20:20] **Henry:** It was like, the common notion is that programming is about making programs or pieces of texts, right? Programs about the code. And later he says that, no, it's actually about the insight that you have, which is essentially the mental model. And then he goes into this idea that, you know, programs have a life cycle even. And that's why it's interesting to say that programs are living rather than dead, that there's like a life death, and like you could say rebirth and all that has to do with the people that made it.

[20:50] **Henry:** Do they still understand how the program works? When the program dies, it's not when the program doesn't work, it's when the people don't understand how it works.

[21:00] **Maggie:** yeah.

[21:00] **Henry:** It even says later that, the program that's dead can still have useful output, meaning that, you know, the program, like when it's not maintained right. It's still working. I thought that was fascinating.

[21:09] **Maggie:** I like that. So that's like "program as a living organism" is like that big metaphor. That's interesting. I mean I may keep a lot of lists of programming metaphors I see around, and they're always very nature-based. I mean, most of our metaphors in the world are. But particularly, I mean, okay, on a higher level they get, sometimes they get a bit mechanical based, but that's actually the more trite ones that a part of some tutorial article and everyone goes, Oh, it's like a car in general or something.

[21:36] **Maggie:** Cause we, yeah. There's also a glorification of the mechanical in programming culture. So people like to jump to rocket ships and cause and jet planes as the metaphorical example. But when you really look at the actual metaphorical language programmers use, it's all very nature. Right? It's like trees, right. You've roots, you have branches, forks, which, okay. Utensils. It kind of gets like tools.

[21:59] **Henry:** Or fork in the road, I guess, but

[22:00] **Maggie:** Yeah, true. I think source is being like, like a water source or like a life source. Are there other, I dunno. What metaphors do you see popping up around?

[22:11] **Henry:** I mean, when I was trying to come up with the name for **Hope in Source**, we were trying to find like the cover, right? It was like some kind of plant and so. We were thinking of like, source of truth and like, you know, source of water. Another one I wanted to use was commit, which is not necessarily like a physical thing. It's more like the idea of we have to commit to something, like people. So.

[22:32] **Maggie:** Yeah. No, then it could be, cause there's ways to have it be code as community or code as an organization. Right, like imagine if we stopped seeing code as sets of files, and saw them as, I don't know. Like, you know, if you had like a circle of people and everyone's putting one drop in, you know, there's all these ways you can build metaphors that change the way you see the code file.

[22:53] **Henry:** There's also code like all of the statements are like rules, right? It's like a rule based system. They actually, maybe they do call them commitments, where it's like everything has to be true for each thing or something.

[23:03] **Maggie:** Yeah.

[23:04] **Henry:** Well, that's more like math, but yeah.

[23:06] **Maggie:** Cause did you come from a math computer science background?

[23:11] **Henry:** I studied, industrial engineering, and I don't know how to describe that other than having to do with like the supply chain and like statistics.

[23:20] **Maggie:** It's like building bridges sort of thing.

[23:22] **Henry:** Oh yeah. So like one thing is people think that industrial engineering is like industrial design or like civil engineering. But it's actually different.

[23:31] **Henry:** It's funny, there was this joke that people would say at my school that industrial engineering is like imaginary engineering. It's funny. It actually, we were talking about this, it's not related to reality cause we're not making like physical things. I feel like a lot of it was around like making things efficient, so it'd be like, how many cashiers did you have?

[23:50] **Maggie:** Oh, interesting.

[23:52] **Henry:** Queuing, like the average length of time to wait to get something.

[23:56] **Maggie:** Oh, so in theory then you should be one of those programmers that wants to optimize the system from a very high level.

[24:03] **Henry:** In theory.

[24:04] **Maggie:** (laughs)

[24:05] **Henry:** I remember even like the first week, we had this like Q and A with professors, I was questioning to myself, I don't really want to make machines efficient. And I was like, I want to make people efficient but not in the like mechanical way.

[24:17] **Henry:** I just want to figure out how to make tools that help us but not turn us into machines. So it's funny thinking back. That I got led into computer science, and then somehow I was like super invested in like visualization and like the games and stuff. And then now I ended up on a compiler, which I never really wanted to right?

[24:39] **Maggie:** right. Is that when you went into the gamification theory stuff?

[24:42] **Henry:** Yeah, I think I got into that a little bit, but I like video games as a medium to help teach people because I mean, I think there are a lot of programmers that play games, but you know, from the UI point of view and then just like, not every game has a tutorial that is explicit where they tell you like, this is how to do things.

[25:01] **Henry:** Sometimes they just put you in there, right? And then you just kinda figure it out. Kind of like what you're saying with, people expect when they get into the game to move to the right. But I saw a few interesting videos on [what's it like to not be a gamer and play games](https://www.youtube.com/watch?v=ax7f3JZJHSw)?

[25:13] **Henry:** And one of them was like, they wanted to go to the left instead, but it's a, wall or something or an invisible wall. Um, and so there's all these assumptions that are built into the games because you've been playing them for like 20 years. So it's like similar.

[25:27] **Maggie:** Yeah. Yeah. That's very much like certain programs when, if you're trying to let a new one you're like dropped in,

[25:32] **Henry:** Yeah. Jumped in is a good metaphor.

[25:34] **Maggie:** Yeah, exactly right. The dropped in, right? Like we think like, I don't know what it would be. We're above and the code file's below. I'm trying to figure that one out. I mean, documentation is like a whole different conversation, but like, it just seems to me like the whole way documentation gets done right now just seems.. problematic sounds like there's something specifically wrong with it, but just maybe not optimal or maybe not the best way to teach someone a new programming concept..

[25:56] **Henry:** Yeah.

[25:57] **Maggie:** Hating on all the documentation, right. Is it doing a great job? It's just a hard problem.

[26:03] **Henry:** Right? I think about that phrase, the map is not the territory. and applying that to programming where it's like, it doesn't mean we shouldn't have docs and all these things, but in another way, none of those things are enough. And, in that essay I was talking about they said that theory, that mental model part of it cannot be expressed, but is inextricably bound to human beings.

[26:23] **Henry:** And I think that statement is similar to what Polanyi says about how knowledge is personal. And that in a way, it's just trying to say that like people are essential. And by believing that we can only write docs is in a way, kind of abstraction too, right? It's saying that maybe if we write all the docs and they're perfect, that we could just get rid of these maintainers or someone else could just come in. And this maybe that vocabulary we use of people are like resources. We can just interchange them, in and out right.

[26:55] **Maggie:** Yeah, that is interesting actually. Documentation very rarely has the identity or the personality of the creator in them. Usually the way you find out is on Twitter. It says in their profile, you know, created or whatever, and you go, Oh my gosh, I didn't know they created that library. That's so funny.

[27:10] **Maggie:** And no documentation.. I mean, it's funny too, if you think of code as a piece of art, you would never not have the artist's name attached to the work. And in programming, for some reason, documentation becomes this like.. Well, even the name, formal document. It feels like some like meeting notes, you know? You're like, Oh.

[27:27] **Henry:** I think that's, that whole idea is super interesting to me because this is the same thing in like journalism, right? It's like you want to be objective, Right? And in programming, the docs should be like this vague notion of what is objective, but they're all written by people.

[27:43] **Henry:** And there's actually a type of journalism called **Gonzo journalism**, I found out, which is like where you purposely at admit that you are biased and you just write in that way instead of people pretending that their being objective. It's not that you should purposely try to be biased. It's just admitting that you are anyway, right.

[27:59] **Maggie:** Yeah. Like, anthropology has a long.. So for context, for people who didn't hear the first one. I originally studied cultural anthropology and I'm still very interested in, read too much about it all the time. But, in anthropology, we have a concept called **auto ethnography**. So at the beginning of any.. an ethnography is a piece of writing that describes a culture that someone's been working within and studying.

[28:20] **Maggie:** And at the beginning of every single one of our essays, or like my thesis, I had to write an auto ethnography, which is a statement that declares your positionality to the culture. So you say, are you a member of it? how did you get involved in it? We use terms like **etic** and **emic**. So etic means you are an outsider, and emic means you are an insider.

[28:39] **Maggie:** So if I were to write an ethnography of the JavaScript world, which I would love to do, I'm probably. maybe by the time I'm forty, that's one of those life goals. I'm probably at this point more emic than etic, so I'm probably more inside than outside it, but I definitely came to it etically. So as an outsider, studying it and curious about it, so it's not a, you know, either-or, it's a linear scale.

[29:02] **Henry:** Right, right. It could change over time. I have so many stories.. and I'm not even like that, old in the whole span of this thing, right.

[29:12] **Maggie:** Well, you might need to validate an idea for me. So I've been, brainstorming, I really want to start a podcast just because I started going on them and it's so fun to chat to people and I was debating topics to do. And I kind of want to do an ethnography of JavaScript version where I just ask people like you or people who have been involved in the community for a long time and thinking about it just to tell me stories about, you know, the cultural side of this world. Um, yeah, so you might be coming on that.

[29:41] **Henry:** There's a lot of people that like, it is interesting how there are people that, you know, you could say like there's jQuery and like Backbone, like all these different frameworks that people aren't talking about as much anymore, but they were very important. It's still being used right now, so there's, there's a lot of history there.

[29:57] **Henry:** I know Allen, he was the editor of ES6, for JavaScript. He just did with Brendan Eich a book called like **20 Years of JavaScript**. I can link it to you later.

[30:08] **Maggie:** Yeah. Cause I'm always, sort of surprised by the lack of explicit cultural writing about, about the community. It's funny, it mostly shows up in tweets, right? Like tweets that you can tell get tons and tons of likes and retweets. Like my favorite account is I am a developer. Do you know that one?

[30:24] **Henry:** Yeah.

[30:24] **Maggie:** To me, he's like the best cultural anthropologist of the whole industry. It's just like finger on the pulse, like he knows exactly. And it's mostly, it shows up in humor, right? That's when you really tell people seeing insight into patterns in the culture is when they're making jokes and they really hit, you know, they hit on a nerve.

[30:40] **Henry:** I have a story with him too, like whoever did that, they were, because eventually they're going to tweet about how Babel is like really hard to configure, it's slow or whatever. And then I tweeted that I gave a talk about his tweet and then he retweeted that too. As a maintainer, I thought that was funny.

[30:59] **Maggie:** Yeah. I know. I also liked the fact that whoever it is, they're anonymous, just like this, you know, generic developer.

[31:10] **Maggie:** We also wanted to talk about, well a book, but most also more of an idea. So there's this book called [Purity and Danger](https://en.wikipedia.org/wiki/Purity_and_Danger) by an anthropologist called [Mary Douglas](https://en.wikipedia.org/wiki/Mary_Douglas). And she, I think she wrote this book in the 1960s, and it's essentially kind of the quintessential anthropological text about, ideas about purity, pollution, dirt, cleanliness and danger.

[31:33] **Maggie:** So how those ideas all relate to each other and they do quite strongly. This definitely maps onto programming because I mean, we very much talk about programming through bodily metaphors. And a lot of this book is about bodily pollution and our discomfort with the body and how we use pollution rules to sort of police and maintain the body in certain ways, which also can get a bit into [Michel Foucault](https://en.wikipedia.org/wiki/Michel_Foucault). But he's a bit too much. I think we should rather leave him cause he's a deep one. Mary Douglas wrote this book, before Focault and so she starts out by defining dirt which seems kind of strange.

[32:07] **Maggie:** You think, well, we all know what _dirt_ is, but when you really think about it, it's actually quite a flexible concept. So she says that it's anything that is matter out of place. So anytime we have something that we think should be in one place, but it isn't, we call it dirt.

[32:21] **Maggie:** So for example, the hair on my head right now is not dirty. But if a piece of my hair were in the kitchen, it would be dirty. Right? And like, how did it suddenly get dirty? The only thing was that there were boundaries around where we think it should be and shouldn't be, and then it's suddenly dirty. So, you know, this works the same with coffee in a cup, not dirty, coffee on your desk, dirty.

[32:40] **Maggie:** Dirt outside, in the flower bed, or soil outside, not dirty, in the house, dirty. Socks on my feet, not dirty, socks on my plate, gross. So she says that all dirt is contextual, so it can vary culture to culture, what is considered dirty and what is considered clean.

[32:59] **Maggie:** And it all just depends on where we draw the boundaries. So we say, okay, actually she has quite a poetic idea of cleanliness, which I quite like. Well, she says cleaning is just us trying to put the world in order. We say, I have an imagined idea of how I think the world should be in my head and I'm going to, if I clean my desk, I am creating the world in my head.

[33:22] **Maggie:** It's an act of creation. It's just one that like, inevitably, you know, degrades and entropy, you know, it eventually gets dirty again, and then you put it back in order and then it gets to, you know, but yeah, it's everything about dirtiness and cleanliness is all just around us drawing boundaries, in the world of where we think things should be. So in programming we talk about dirty code, right?

[33:42] **Henry:** Clean code. Yeah.

[33:45] **Maggie:** Which since I'm not genuinely like a developer as my full time job, I'm very much like, you know, sort of just watching from the sidelines and sort of part of the educational side of it, but I don't work in it. It's a team every day talking about code and dirty code and clean code, but are those quite common terms and other other words that get used in that vein?

[34:07] **Henry:** Huh, that's a good question. I don't know if people are literally like, Oh, that's dirty code, but I think everyone knows that that's what people say. Um, I guess you would use, you know, like refactoring that kind of word, or like, or like renaming, like those words. I don't know about like that explicitly in that, maybe that sounds too negative, you know?

[34:30] **Maggie:** I've had people say, well, so I work for **egghead** and there's, I know we've had sometimes, like, contractors come in and I've seen it develop a chat. They'll say something like, Oh, don't look over there. It's gross. Like, yeah, you know, like some old code, we have a cleaned up in a while, and they're like, yeah, that's a dirty corner. Don't go over there.

[34:50] **Henry:** Yeah. Like untouched. Yeah. It's picking up dust or whatever you could say that.

[34:54] **Maggie:** Yeah. Um, so it could be that, you know, and we talked a bit about, you know, programming moves fast and things like jQuery are no longer seem no longer relevant. It seems like maybe the world moves way it reorders the world so quickly that the definition of dirty and clean changes so fast that some old code that might have jQuery on it is now considered dirty but used to be clean but boundaries have moved.

[35:18] **Henry:** Right. So that is sort of like the patterns are changing where it's like it works fine. It could probably have no bugs, but then we still think it looks bad because that's not like the correct way to do things.

[35:28] **Maggie:** Yeah. Well, it's a, it's a nice idea. You have an idea in your head of, it would be nice if this was clean, right? You want to create your imagined world.

[35:35] **Henry:** Yeah, that's interesting. In terms of digital, because it's like we do have unlimited space, and so I think it's interesting that at the same time, you know, we talk about how once he puts in something on the internet, you can never like take it back. But at the same time that you can forget about things just because it's not in the zeitgeist or like, it's not like a thing that people are paying attention to, so it can be forgotten. It's like both at the same time.

[35:58] **Maggie:** Yeah. It was kinda interesting that, I mean, this is a bit about the dirt and purity thing, that we very much, we talk about computer programming as through the body metaphor. So this does get back to the embodiment stuff a bit. I mean, but most specifically only with viruses, right? It's like you talk about, yeah, computer viruses, And then can machines become infected? But it's funny, I've never heard anyone use words related to immune systems or vaccines as much with programming. I'm trying to think when you disinfect, you know?

[36:26] **Henry:** Yeah. That's interesting, huh? The only thing we talk about is like, well, actually I was thinking about computers, like sleeping, hibernation and, restoring well, and then the whole like, turn it off and on again thing, right?

[36:39] **Maggie:** Yeah. Like when you wake up your Mac, I feel like Apple did all that rather intentionally though. I think they gave us sleeping, waking up, hibernating. I don't know if it was Mac, maybe it was someone before them, but I guess that was my first experience of, I had the old MacBook that had the breathing light, if you remember that it would pulse when it was asleep. yeah. It's just beautiful.

[36:59] **Henry:** I think with like Erlang the whole point is that you're supposed to shut things off and on. So instead of trying to like restore things, cause it's easy to startup and turn off like small processes.

[37:10] **Maggie:** Yeah.

[37:11] **Henry:** I guess we have linters?

[37:13] **Maggie:** Oh yeah. Is that, Oh yes, that is! That's funny cause that's just like on your clothes, when you get a linting brush. See that? There we go. I mean there's of course, _bugs_. But I love the historical origin of that one, that it was like a physical bug that they found in the, I forget it. Was it the punch cards? They had like a bug in it, like a squat fly. Or something. So that's like a beautiful historical metaphor. They, so they sometimes call those **dead metaphors** was where the original meaning almost doesn't matter. And we just use the metaphor without understanding where it came from. But you can look up the history on Wikipedia. It's there.

[37:49] **Henry:** Or like some of the icons that we use. I know like save, maybe it used to be like a floppy disk, but we don't use that or something.

[37:57] **Maggie:** Yeah. Well, even like, so I'm going to have to try and think of the name of this guy. I can look it up really quick. There's a guy who wrote all this wonderful stuff on, internet metaphors and digital metaphors and where they came from. I'm going to find his name here. But he talked about how in the very beginning when, mostly at Apple, they were starting to try and design those icons, and figure out a way to give cause, right, Apple designed the desktop metaphor right? So before that, all computers were just the command line. You know, you just don't have anywhere to start. And they designed this idea of like, okay, your computer is like your desk and the code on your thing is contained into files, just like your paper on the desk.

[38:34] **Maggie:** And everything about the way we use modern computers is framed around this, this desktop metaphor. I found his name, **Tim Rohrer**. I can't say that. Anyway, he wrote a lot of wonderful papers about the history of internet metaphors and digital metaphors.

[38:48] **Maggie:** And he talked about, in the beginning they had a really hard time getting people to understand how to use the desktop, which to now, us is just.. of course it's intuitive, you know? That's what we say. Of course, you know where the stop button is. Of course, you know how to find files. Who wouldn't know that?

[39:03] **Maggie:** And yet when they first handed personal computers to people and then they would try to teach them to like drag a file into the trashcan and people, or they had to like try to eject disc with the, and they were like, why would I drag a disc into the trashcan? That makes no sense. Like, what do you mean eject?

[39:19] **Maggie:** What am I ejecting? They, you know, they really struggled to do that and now we take it all for granted, but that's where it becomes tacit knowledge that we don't realize that, it's just embedded in us.

[39:30] **Henry:** And I guess with every, you know, I guess you could use the word medium. It changes. So like when we had touchscreens, then you had to teach everyone how to do that. And I guess maybe with VR it's like same, thing. If we ever get to that.

[39:42] **Maggie:** No, I have read some articles of people who are designers for VR systems. You say that's the biggest challenge, is how do you, how do you give people a familiar interface when they're in a completely different world? Right. And so, and so we're still in the phase of it. A lot of VR worlds, they will draw a little floating button the same way, like any button on a website, right.

[40:03] **Maggie:** Where you click okay. They just. Well, one of those in the middle of the screen and get people to kind of tap it and you kind of go, is this really the most intuitive way we can confirm things as we put? And it's like a metaphor, a metaphor of a master metaphor.

[40:17] **Henry:** Yeah. And I know in some games they'll, they'll show your hands, but they don't show your arms, so at least you have some anchor to see what you're doing. It kind of reminds me of, like **McLuhan** in my talk too, from **The Medium is the Message**. You know, he talks about how technologies are extensions of your physical and nervous system. Right. I think that's really interesting metaphor too.

[40:41] **Maggie:** Yeah. Yeah. I had mentioned that a bit in the, in the other talk I'd done too, one of my favorite sort of philosopher anthropologists, is a guy called [Andy Clark](https://en.wikipedia.org/wiki/Andy_Clark), and he wrote this book, [Natural Born Cyborgs](https://maggieappleton.com/cyborg-history), which argues to take cyborg, just to mean a blend of technology and human, that he says from the beginning, we are, have always been tool-based creatures and that the tools are extensions of ourselves.

[41:00] **Maggie:** And a digital tool is no different to a hammer or a cup. You know, and it can get a bit tricky with it if you want, you know, and to go into the whole world theory where you say, we are all one, you know, I am not different than the cup and the cup is, is part of me and I am part of the cup and that sort of thing.

[41:17] **Maggie:** But it is true that if you took humans and you took away all our tools that we've designed, you can take everything to be a tool: the house, the electricity, the internet. This kind of gets back to the second brain theory of what I mentioned at the beginning, where you sort of accept that the internet is an extension of your brain, and it doesn't make you less human, and it's not some sort of weird negative thing where you're trying to like downplay your emotion and your body. You're just saying, I embrace that this is all one continuous system. I should have mentioned the correct term for this is: it's a theory called **cybernetics**, where they say were all in a cyber network, you know, it's all one big connected GraphQL sort of node system.

[41:56] **Henry:** The cup thing is funny cause I was reading about **Bruce Lee**. I don't know if you remember his quote about water? And he's like, be like water. If you put water into the cup, it becomes the cup.

[42:06] **Maggie:** I have seen that.

[42:07] **Henry:** It'd be like water, right? I thought was funny.

[42:10] **Maggie:** Mhmm.

[42:10] **Henry:** Cause it relates a lot to what you're saying about like, you know, the hammer and like that's an extension.

[42:15] **Henry:** Polanyi actually uses that metaphor to talk about knowing like epistemology. And he thinks that when we are learning, the things that we use are clues for us to figure out like, how do we think about reality? And so it's kind of like when you're holding the pen, you are in a way, abstracting it so that you're thinking through the pen itself, right? But then you can also focus your attention on the pen so that you're not focusing on what you're writing. So you could choose to change your relationship to the things that you're touching, right? Like say if you're playing piano is probably easier. Like you can play the song or you can focus on your fingers and each of those things. You're doing both of those things at the same time. So one would be like, I need to practice my scales versus I need to play this song.

[43:03] **Maggie:** Mm, yeah. And it does make sense, but it is a bit funny how we define the edge of the self and also the big emphasis on the self as like an, you know, individual being is a very inherently Western thing. Putting emphasis on that. But we put so much concern into the edge of ourself and the rest of the world, right? I end here, wherever my skin is, that is the end of me. And then everything else beyond that is something different.

[43:27] **Maggie:** And of course, like again, you get into like trippy Buddhist theory, you know, they'll say that that's not true. But it is, you know, like, I always think of this with my keyboard shortcuts. I can't explicitly tell you, like if you asked me what combination of keys I pressed to do certain things, I couldn't begin to tell you any of them. And yet when I'm in a particular app, in a particular context and I want to do a certain thing, my fingers just hit keys and I don't know what keys they are.

[43:54] **Maggie:** I set them up some time ago, but now it is so muscle memory that it feels the same to me as moving a finger. It's not, it doesn't feel different outside of myself. That is part of me and how I operate, you know?

[44:06] **Henry:** No yeah. I think that's a good example of like tacit knowledge and I guess one way of looking at it is that our self can be expanded to whatever we pay attention to, right? So if we're not paying attention to it, then we, that means we think that it is part of us.

[44:22] **Maggie:** Right, right. I do like that, cause yeah, it's sort of like if you're not actively thinking about your right foot right now, it might as well not exist. It's not part of your current conscious world, you know?

[44:32] **Henry:** But it's a part of you.

[44:33] **Maggie:** Yeah. I like that idea of that the sense of self can shift and expand to include other objects and other bits of the world that don't have to be defined by my biological body, because that is a bit of an odd place to draw the line.

[44:46] **Henry:** Yeah one thing that I've been reading is that I think it's really easy to think that tacit knowledge is just implicit knowledge, right? It seems very similar, like explicit versus implicit. Explicit is just the things that I can say and implicit, I don't have the words for those things. He uses very technical terms, but there's this phrase that he uses called **focal subsidiary integration**.

[45:08] **Maggie:** Gosh.

[45:09] **Henry:** Super complicated, but he's just saying that the thing you're focusing on is the focal and everything around it is called subsidiary, right? Like the things and the periphery are around it. It doesn't have to be the spatial version, but just that's how you think of these things. And so he's saying that there's always a focal and a subsidiary and they all happen at the same time, but you choose to focus on one thing.

[45:33] **Henry:** So in the case of the piano, normally if you're playing the piece right, the, the song, your focal is the song and the subsidiary is you're playing with your hands, but you're not thinking about your hands because you've already learned how to play, this is assuming you know how to play.

[45:46] **Henry:** But if you focus back on the hands and the song becomes subsidiary, you might not actually be able to play anymore because you're focusing too much on your fingers again. I like this other metaphor of like when we're giving out speech and then you start thinking about your words, then you start getting nervous. So getting nervous is just focusing on yourself versus like the thing that you're actually wanting to say, like getting stagefright.

[46:08] **Maggie:** Yeah. I mean, I'm sure you covered this in your talk. This is exactly in the programming context is like a newer programmers focused so much on syntax and libraries and frameworks and more experienced programmers have gotten to the level where they're thinking in the higher level abstract structures of things or mental models, but really metaphors. Of how to fit things together on a higher level, but people who are newer are probably more concerned about whether it's Vue or React or whatever, you know, Python.

[46:35] **Henry:** And maybe in a way, you give away your experiences by your questions, right? So if they say, what should I use? React or Vue, then you know.. that doesn't mean they're a bad programmer, it just means they're inexperienced, right? They don't know what to ask.

[46:49] **Henry:** Going back to Bruce Lee again, I liked his, he has like this three stages of cultivation that I talked about in terms of knowledge. And so like the first stage is called the primitive stage where you don't really know what you're doing, so it's all based on intuition. Like if you're programming, you just doing things, you don't even know that there's like a way of doing things. And then you move onto the second stage where you ask somebody and they tell you, and that's the mechanical stage, where you learn some principle about programming or you learn a framework and then you think, once I learn React, everything is React.

[47:22] **Henry:** Like I want to make a.. every single app I can make, I'll use React. Or once I learn DRY, everything has to be, don't repeat yourself, right. And then we know that if you're in the third stage, you'll be like, the answer is that it depends. It's not always, you can apply that one thing everywhere. And he calls that artlessness. There is no stage, you have to figure out the context, right? The situation.

[47:43] **Maggie:** Right. Oh, I love that. See I struggle with that so much with answering questions. I do get a lot of questions of, whenever I put up an illustration of what app is that, is like the classic thing, you know. And I always just try to be very polite about it, because of course it is just people who don't know, and what else do you ask? Like I would ask that if anything else, right? If I saw someone, I don't know, riding a bicycle, it'd be like, I don't know he's in some fancy way, I'd go, what bike is that? You know, I don't know. But it is difficult to explain to people that the app is, absolutely nothing to do with it.

[48:11] **Maggie:** It's all on the metaphor level and it's all on the, well, there's for sure visual design level to it. You have to think in shapes and balance and repetition and movement, and there's all these much higher level things that determine it, and I can draw in Procreate or in Illustrator or in Photoshop or in the dirt and it doesn't matter, I'm applying the exact same principles to all of them.

[48:31] **Maggie:** But yeah, I haven't quite found the most elegant way yet to say that. And perhaps there isn't a way to explain that to someone. They just need to get in and see that for themselves. You can go buy yourself the nicest iPad Pro with the biggest screen and download the same app, and you will sit there and not be able to draw the thing.

[48:48] **Henry:** Right, exactly, yeah. We think that knowledge is about either the tools or the actual content, but we forget that you have to know how to use those things. Right. So what you said, like whether it's programming or cooking or playing an instrument, the best tools aren't going to help you if you don't know how to use them right.

[49:07] **Maggie:** Yeah. I mean, there's certainly entry doors. I do struggle with that tension a bit where I go, okay, well the person can't learn the experience of drawing without some tool to draw with. But to shift people's mindset to say, you could get this app and it wouldn't help, but you do need an app of some sort to attempt to draw.

[49:25] **Henry:** But it is interesting that. I find myself, focusing on that so much like the tool, right? Like when you don't, maybe that's one way of knowing that you're inexperienced is when you are spending all your time, like say you're trying to buy, like I'm trying to buy a new computer or whatever it is.

[49:41] **Henry:** You feel like you have to do all this research upfront just to get something. Or like someone's like, Hey, I want to make my, a podcast for the first time, and like, well, what do I need? And I will just tell them, just use your phone. It's more important for you to even just start doing it at all than to buy all this stuff, right.

[49:55] **Maggie:** Yeah. I've never quite figured out the tension between it. Cause I definitely believe in the. Well, I mean, everything we were talking about, right? Like tools as part of embodiment and as part of extensions of ourselves. So like, I care deeply about my tools, you know, I'm for sure the person that customizes everything to like the absurd degree, you know, I love macros on my, you know, desktop and I love making, I think of it as both fitting myself to the machine and fitting the machine to me in this, like, interplay.

[50:22] **Maggie:** Where you just, merge and become one. Not that I think my machine is like an embodied being that cares whether it involves itself with me, but you know, I think about it in a very uh, anthropomorph.. **anthropomorphization** that's the word. It is animate to me, it is a being.

[50:39] **Henry:** Yeah.

[50:39] **Maggie:** And not in a way right, where it has human rights, but as an I think of it as a more, cognitive living being in itself than perhaps other people might. But I'm more, I'm more prone to take magic and mysticism and animism seriously, just from reading about it in anthropology and understanding it's a beautiful way to see the world, even if you don't, on a rational level, think it's all true.

[51:00] **Henry:** Yeah. No, I resonated with that too with a book I was reading called **The Cat and The Toaster**. It's a book about ministry, but I think you can apply it to a lot of things. The key question is essentially, what are we dealing with, for whatever problem we're trying to solve? Is it a cat, or is it a toaster? Or if it's a toaster? You can take it apart. You can put it back together, you can repair it. But you definitely don't want to do that with the cat. So basically understand, are you dealing with a living thing, or a non-living thing. And it doesn't have to mean that it's literally that, right? So if you apply that to the metaphor of open source or a city or the environment, none of those things are living in a way, but we can treat them as living.

[51:45] **Maggie:** I like that. Yeah. Like I always love that as systems, as organisms. I mean, we, we use that metaphor all the time. And especially programming as organism is probably my favorite programming metaphor to lean into, as living system. I liked your birth and death stuff about it, that makes perfect sense.

[52:02] **Henry:** And a lot of that is, to me, it relates to, Jane Jacobs wrote a book called **The Death and Life of Great American Cities**. So she uses the same kind of language in a way.

[52:12] **Maggie:** I have definitely seen that one around, but haven't read it yet.

[52:15] **Henry:** Yeah I haven't either, I only read the last chapter!

[52:19] **Maggie:** I think we talked, I forget if we mentioned this on the last one. My policy on books is always, there's a good book called [How to Talk About Books You Haven't Read](https://en.wikipedia.org/wiki/How_to_Talk_About_Books_You_Haven%27t_Read) by [Pierre Bayard](https://en.wikipedia.org/wiki/Pierre_Bayard), where there's a strategic way to read books where like it's not traditional, like read, start at page one and you know, and last page, there's completely a way to read books where you strategically are like, okay, I'm gonna read the contents, the introduction, I'm going to skim the chapters that look important to me, I'm going to read the Wikipedia article, and for all intents and purposes, I have gotten what I need from that book. I'm allowed to revisit it in the future if I need to, but I'm allowed to now reference that thing because life is short.

[52:52] **Henry:** Yeah, and I've mentioned that too, cause I always have to tell people like, I haven't read these books, but I'm talking about them.

[53:00] **Maggie:** That's okay. And honestly, nowadays, whenever a book comes out the person goes on so many podcasts and video lectures and interviews, you can pretty much read the book without ever touching the book.

[53:09] **Henry:** At least for a new book.

[53:14] **Maggie:** Yes. But most of the good stuff's in older books where no one's been on a YouTube tour, so there's still the need to scan them.

[53:19] **Henry:** We talked about a lot of books from like, it's not even that old, 1950, sixties.

[53:25] **Maggie:** I know. Which nowadays people think is like, Oh, ages ago. You're like, well, actually, human history has been going on for quite awhile.

[53:33] **Henry:** So anything else you wanted to add in?

[53:36] **Maggie:** No, I think we touched on most of our embodiment metaphor nerd stuff.

[53:41] **Henry:** Cool. I guess we could just end it there then. Yeah. Awesome.
