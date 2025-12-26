---
title: "The Significance of Standards (Jory Burson)"
season: 2
date: 2019-05-24
time: "65"
description: "Why should we standardize? Jory Burson (Bocoup) joins Henry to
  talk open source and standards: what they are, why we need them, what should
  be standardized, lifecycles of standards, past/future accessibility of
  participating in the process, and more!"
episodeLink: https://anchor.fm/s/ff707650/podcast/play/96461850/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-11-31%2F392345814-44100-2-2ae073284749dc6b.mp3
embedUrl: https://podcasters.spotify.com/pod/show/hopeinsource/episodes/MA-6-Jory-Burson-on-the-Significance-of-Standards-e2su9iq
sidebar:
  order: 6
---

[00:07] **Henry:** Today I have with me Jory Burson. She's been involved in standards for a really long time. I met her through TC39. Thanks for joining today.

[00:19] **Jory:** Of course, I always enjoy chatting with you.

[00:21] **Henry:** Can you go into more of your background, actually? I know there's a lot to cover.

[00:27] **Jory:** Yeah. I think it's interesting, because standards work is considered sort of like this older population of people who care about standards, and then there's me. I'm very young. I just want everybody to know. Just kidding. How I fell down that rabbit hole is kind of interesting, because I came to work in 2011 here at Bocoup, which is where we're recording from today. We have like this really cool office space. My job at the time was to do training classes and events and stuff that were kind of furthering our commitment and our activities in the broader community.

[01:16] **Jory:** We would host things like the W3C tag meeting, and different, like the Mongo community working group meetings, and the TC39 meeting and things like that. I had been part of Open Source. I knew what Open Source was, I knew what the W3C was. I knew what these organizations did, but I never really thought about how technology gets made. Then we start hosting these meetings, and I realized, oh, so what happens is just a bunch of people get in a room and argue with each other for three days. Then out the other side we have-

[02:02] **Henry:** A standard.

[02:02] **Jory:** Yeah, a standard, what? That seems-

[02:05] **Henry:** That seems like it would be more complicated, but it's just a bunch of meetings and people talk about it.

[02:12] **Jory:** Right, exactly. You think, oh, there's got to be some-

[02:15] **Henry:** Process.

[02:16] **Jory:** ... process. Further, I was seeing that the people in the room were like, some of them were my age, some of them were older. They looked like me, they didn't look like me. It's just like really, what? I thought some like, I don't know, the pope of standards comes down-

[02:33] **Henry:** Right, and chooses people.

[02:35] **Jory:** Yeah.

[02:35] **Henry:** Right. I don't know how these people come to where they are. Maybe there's all different stories.

[02:40] **Jory:** Right. It just blew my mind. I realized it wasn't, it was both more complicated and not any more complicated than that. From there, I just decided that I really wanted to know as much as I could about how this system worked, because it was clearly something that was happening and that I was taking for granted. It must be other people didn't know too.

[03:07] **Henry:** Yeah. I mean I think it's probably, now you bring it up, because I feel like that's the same with say with me joining Open Source, or anyone... There's that point, I don't know, it's a weird epiphany where you're using something or you're involved in something from the outside, you want to be looking in. Then you finally realize, oh, I could be a part of this. I could be on the inside, or that the whole [inaudible 00:03:31] that far away for you it's possible. Yeah, I guess it's one of your goals about the help more people be a part of that, right?

[03:40] **Jory:** Right, exactly. That's kind of what I was tasked to do. Then I got more involved in just helping plan meetings, and helping arrange logistics and getting people plugged in. I think a lot of what I learned early, early on was sometimes it was just a task of making sure people knew what was going on. That was a barrier, is just knowledge of, oh, well the meeting's happening here, that kind of stuff, and here's how you get here.

[04:14] **Jory:** Then it kind of, my understanding of things kind of unfolded more as I realized, maybe a meeting space and that kind of stuff is a shared common problem across the W3C or TC39 or whatever, but there are these other systems of decision making that the W3C has that Ecma doesn't have, that OASIS doesn't have. That there was actually this whole industry behind what we were doing that we were kind of making up for the web, but it's actually been around for a long, long time. So then I started getting into the history of standard. I kind of identify as a bit of a standards historian, I think.

[05:08] **Henry:** Yeah. It's interesting, the place is, I guess it's not that different from conference organizing. Bringing people in and logistics. Then the actual part of the meeting itself is totally different. I guess maybe we should back up a bit, and talk about what exactly, how do we define what a standard is. How people think about them. When people hear the word standard, they probably think of like, I don't know, electricity, standards are like USB and stuff like that, right?

[05:39] **Jory:** Yeah.

[05:39] **Henry:** Then it's maybe even like how is that different from like an open source standard, or the web standards?

[05:48] **Jory:** Yeah, yeah. Talking earlier how we kind of have this failure of language, because we use the word standard to do a lot of heavy lifting for us in different places.

[06:02] **Henry:** Kind of like [inaudible 00:06:03].

[06:03] **Jory:** Yeah. Very specifically, when I'm talking about standards here, I'm talking about a technical specification of some kind that has gone through a fairly rigorous process. And the end result of that is a standards body has accredited that standard to say it has satisfied the rules of the process. Which often include rules about how decisions were made, how different parties or constituencies were consulted, IPR commitments of some kind.

[06:52] **Jory:** Generally there's some sort of review period that the standards organization will have so that people from within and without the organization can come in and raise any issues or concerns against that standard. Once that's all done, we say that that's a... There may be some vote that's held as well. But when that process is concluded, we say that that's now a W3C standard, or an Ecma standard, or an OASIS standard, or an ITF standard. Ostensibly from there, the standard is either furthered through the international standard system, which could go through a national standards organization in the United States.

[07:41] **Jory:** We have ANSI, the American National Standards Institute. But there's different, almost every national government has its own standards organization. It could go to the ITU, it could go to ISO, but those are global standards organizations. At that point, it's a kind of document that any government could say, "We want to have a requirement that all electrical outlets produced in our country meet that standard."

[08:24] **Henry:** Yeah, there's so many questions around like who gets to be in the group, and once you make a standard how is it adopted. Is it adopted? How do you make it... I guess, maybe we should talk first what are the things that should be standardized, or how do you decide what should be standardized even?

[08:50] **Jory:** Yeah, that's a really good question. I think the first place to look at is there an opportunity, should there be an opportunity to standardize something is where two systems are meeting.

[09:06] **Henry:** An intersection.

[09:08] **Jory:** In the intersections, exactly. Really what a standard does is promote interoperability of different kinds of systems. It could be data exchanges, or it could be hardware interoperability. Whatever that case may be, that the intent is to help two things kind of-

[09:32] **Henry:** Talk to each other.

[09:33] **Jory:** Talk to each other.

[09:33] **Henry:** It's just like API or interface.

[09:35] **Jory:** Yeah.

[09:36] **Henry:** Just a shared interface.

[09:38] **Jory:** Exactly. So where you have those shared interfaces, especially if those shared interfaces are potentially being produced by competing companies or competing industries, but there is some social or cultural benefit to the two being able to communicate with each other, then we should be looking at whether that should be a standard. We don't want to lock people into one company's view of the world, one company's tools or solutions.

[10:09] **Henry:** I guess off of that, it's like what incentive does a company have to do that? Especially if the company, maybe they're doing really well, they wouldn't want to give that, say I guess with Apple, they have their own standards for certain things. They don't want people to be able to use the same things for multiple devices.

[10:30] **Jory:** Yeah, there have been a number of studies about the economic incentives for companies to think about producing goods in a more interoperable way. The studies tend to show that there may be some short-term gain to be had by trying to lock something down, but over the long-term there you end up paying more. In the case of a company that locks people in too much, you have like the anti, what is it, I suddenly can't remember.

[11:11] **Jory:** It's not antitrust, maybe that is what I'm trying to think of. But you get the punishment of being deemed a monopoly, so you have to break things up and all that kind of thing. So it's not always the most sound economic choice for a company to make. You also have in government procurement a lot of times there's a requirement-

[11:40] **Henry:** To meet a standard.

[11:41] **Jory:** Yeah, that in order for say the government to purchase a technology, it can't just be, the government can't say, "We want to purchase Microsoft Word," for example. It's got to be like, it's a word processing system that produces open standards, so that they're not locked into one particular vendor. I'm speaking of course from a US-centric perspective. That's sort of another kind of piece of the puzzle.

[12:14] **Henry:** Yeah. That makes me think that if the company is really powerful, they have an incentive to have the market, and then just take the format they use and make that the standard. It's almost like making it and going like, "Hey, this is what I want to use, because we have all the users." That becomes the standard.

[12:35] **Jory:** Right. That's something that has started to pop up more as there's been kind of shift in what we're producing and how quickly we produce it. Interoperable standards were extremely important in a world where our goods were physical. We're talking about like if company A produces 2x4's, and company B produces 2x4's, and we want to build structures that are sound, those had better be the same freaking size 2x4's. That's really, really important.

[13:15] **Jory:** But we've shifted to a digital world, and we're producing goods that are at the end of the day some combination of 1's and 0's. People don't necessarily think about how important it is for our digital goods and services to be interoperable. The standard system that we have, in terms of the organizations that accredit standards, that's the SDO system-

[13:50] **Henry:** SDO?

[13:51] **Jory:** Standards Developing Organizations, that system of organizations, has been around since the 1800s. We are talking about in some cases producing digital software standards using this system from over a hundred years ago. That's nutty, that's so cool, also crazy.

[14:20] **Henry:** Yeah, it still works too.

[14:20] **Jory:** It still works, but the complaints are that obviously it's slow, and that it probably doesn't necessarily produce solutions and things as quickly as we would like. So we get all of this innovation in the wild and open source and everything.

[14:41] **Henry:** Oh yeah, I think it's interesting you brought up this transition period, which I guess everything has to seem to have to go through because we live in this technological age. Standards being about physical things, and now being about digital things. I guess even thinking about [Dockerlite 00:14:58], they used an analogy of the shipping container and how that was standardized so that people could put everything in the same container, then we just apply that analogy to software.

[15:10] **Henry:** Yeah, I guess it's just interesting. I don't know how people are able to move through that. People that are, they're not like stuck in the past, but they're still thinking a certain way and other people are trying to, it's almost like... I almost feel like people in the digital age always want to start over, and they forget that there's [inaudible 00:15:28]. I feel like the same with open source. We get [inaudible 00:15:34] page and we forget the past.

[15:37] **Jory:** Right, like it's [inaudible 00:15:39]. Yeah. When I think about what we're still carrying forward from the 1800s, some of the things that I think that we got right that we need to continue to carry forward are the system of one org, one vote. Let's get everybody around the table into some kind of, they used to call them congresses, which was a fancier word for tech conference essentially. Back in the day, they were writing really long letters in like ink and quill, arguing their points of view.

[16:22] **Jory:** Now, we have GitHub issues for that. But they would get everybody in session to debate proposals, and to raise concerns and that kind of thing. It is synchronous. It's a synchronous thing. We still produce standards that way. We still get all of the TC39 delegates in a room six times a year. Say what you want about how expensive that is, it's really valuable to get to know where your compatriots are coming from, some of the concerns that they have. It moves more-

[17:07] **Henry:** Casually, I would say, those conversations. I think people that have not been to the meeting, they might think like, oh, you don't need to do things during the meeting. It's like, well people are talking on chat or GitHub asynchronously between the meetings. But then it's at the meetings you make the decisions.

[17:28] **Jory:** Right. That's exactly, that exact thing happened back then, and it's happening now. That's just a function of basically I think a healthy system working, that smaller groups of people are coming up with ideas, hashing them out together, engaging with people that are disagreeing with them even in a smaller setting. Then going to larger group to make a case, and having that group assent and say, "Yes, we all agree."

[18:01] **Henry:** Yeah, that makes sense. It's funny you call it a congress, because like in way, especially on a Tuesday night, I know of people that you can present other people's proposals, you're representing that group of people or that person or that community. You might not even agree with that proposal in the first place, but you're there.

[18:21] **Jory:** Yeah. That's something that has carried forward, and I think should continue.

[18:31] **Henry:** I guess, because we talked about things, unless there's other things that standards, are you saying have been done well or might, or things that have not?

[18:43] **Jory:** I'll say another thing that is really valuable that we've carried forward, and that's the documentation process, the archival process. Some of the earlier standards organizations are groups like IEEE that have been around for quite some time. They were just religious about documenting agendas, and meeting outcomes, and issues of the day and that kind of thing. That's a role that the modern standards development organization continues to play for communities that are doing technical work. They are basically very important secretaries for the committee, so the committee doesn't have to worry about saving this sort of data. They do it.

[19:45] **Jory:** We know now why a decision was made 20 years ago or 30 years ago in a given space because these organizations have held onto that material. That's like, we were talking archiving earlier, maybe people don't really necessarily care about history or whatever, but one day people do, lots of people do. In the immediate sense, it saves the headache of having to re-litigate a decision that was made, or whatever, or at least providing some context for why we're in the state that we've in. The state that we're in today is a function of decisions that were made 20 years ago.

[20:35] **Henry:** It's just funny, because I feel like I have always wanted to learn about history, not when it's too late, but it's like at the end of when we're doing something, not like while we're doing it. It's weird, because it's like maybe we should be thinking about this stuff earlier, be more proactive rather than retroactive. Yeah.

[20:54] **Jory:** Yeah. I think that's important. I think people sometimes who do care about the history of things and who like to bring it up in the process of making something, and I'm guilty as charged of being one of those people. Sometimes, we end up getting kind of accused of living in the past. In the worst case scenario, it might be like, "Well, just because we used to do something that way, it doesn't mean we have to do it this way moving forward."

[21:32] **Jory:** I don't adhere to that. Let's do change the status quo. But there's oftentimes a decision making framework or an organizational framework that we can glean from how things used to go, or how something happened back then, that if we apply to the decision moving forward, we might find ourselves in a more smooth kind of situation. That's sort of something else I think.

[22:06] **Henry:** Yeah, I was reading about, because you brought up whether we should keep old things or when we should replace them. Recently I had been reading about this idea called Chesterton's fence. It's the idea that when you encounter the fence, you might want to get rid of it. His point was saying that, if you get rid of it, you should at least know why it was put there in the first place, instead of just saying things like, "Oh, it's there. I want to get rid of it." I don't think it means that old things are better or you shouldn't get rid of old things.

[22:39] **Henry:** It's just saying that you need to be informed on what was there in the first place. [inaudible 00:22:45] know that means that I could say with confidence, "Oh, I'm getting rid of this because of this reason." I think it's like, new stuff isn't always better`and old stuff isn't always better, but I think maybe in the end we don't really want to think about it. We just do what feels good or whatever, versus digging through those kind of issues.

[23:06] **Henry:** I really like this quote. I don't remember exactly, it goes something like, tradition is almost like, he said it was the democracy of the dead. It's like people that are not represented are people that aren't alive, and tradition is what they are saying. I thought it was super interesting.

[23:24] **Jory:** I like that on multiple levels. One thing that helps in my mind is just when you come across those things where you might wonder why this is here. This doesn't seem to make sense. I try really hard to just get super curious about not only what it is, but about the people behind that. I have to believe that the people who came before me in a given space were really smart individuals who cared. It seems like the right thing to do to honor that by being curious about what they were doing, and understanding it. I really want that in the future when I'm dead.

[24:16] **Henry:** Yeah, they'll be, oh, this person, yeah, I don't care what-

[24:20] **Jory:** Right. I would like for them to be like, "Oh, well I understand why Jory did that. It doesn't make sense now, but."

[24:25] **Henry:** At the time.

[24:26] **Jory:** Yeah, let me pay me my little, my digital [inaudible 00:24:29], and pay my respects. That's really dark and morbid, sorry.

[24:37] **Henry:** No. Yeah, I guess I just thought this whole thing is so interesting, because [inaudible 00:24:43] liturgy, and it's the same kind of deal. I guess another question related to standards is more like how do we even go about making a standard in the first place? I think even with any tradition really, it's like is it top down or bottom up? What was in the middle? There's this idea of like, to me, based on being in JavaScript, I feel like it's always someone in the community did something in a really weird way, but it works. Then eventually everyone's using it. Then the standard is that you just adopt some version of the thing that everyone's using right now, whether it was jQuery or anything.

[25:22] **Jory:** Yeah. What I think is important about note is that depending on the industry and the technology and the space, standards get made all kinds of different ways. In the web, now today, we tend to want to pave cow paths, so to speak, where we let our open source communities or community groups or whatever just kind of go wild with ideas and stuff. Then we figure out, okay, well what really needs to stick around and what needs to become part of the platform? It goes sort of that direction, and more or less works.

[26:08] **Jory:** But there is still a lot of industries and spaces where we can't do things that way, because they would be too costly. Here, we're looking at things like hardware and that kind of thing. If you do that too many times with chips and things like that, that's an immense amount of cost in terms of just the silica even to produce these things. Then there's a long life cycle between figuring out whether that thing works or not.

[26:39] **Jory:** You have to really figure some stuff up front. When you look at other types of applications for technology, if it's something that is in healthcare or safety, you need to know that you're not endangering lives, that you're not putting something out there that could really move us all backwards a little bit. We kind of have a bit of a luxury in the web space, because the safety net is, the stakes are getting higher and higher for us. Right now, the worst case scenario-

[27:27] **Henry:** The more users are-

[27:28] **Jory:** Right, the more users, the more we're doing things on the web platform, buying homes, and putting our identities out there. So you do have real potential serious negative repercussions, which is part of the reason why it's important to start thinking about standardizing these things. The security and privacy and these concerns that we used to not worry about on the web, we have to now.

[28:00] **Henry:** Right, similarly because there's more people, the whole usability and easy is it, intuitiveness and those kinds of concerns. It gets really complicated. It's not just like, does it look good and is it efficient. Those are obvious things, but then all these other parts come up. It's no wonder it takes a long time.

[28:18] **Jory:** Yeah. And are we potentially marginalizing different groups of people because we have decided that to use an important system, you need a network connection speed that looks like this, or a device that looks like that. If the answer to any of those questions is yes, then you've just disadvantaged somebody in a really-

[28:43] **Henry:** Kind of like literally at a systematic level I guess.

[28:46] **Jory:** Exactly, at a systematic level, exactly.

[28:51] **Henry:** Then yeah, [inaudible 00:28:52] it's also like this idea if you do the cow path thing, maybe that use case isn't even relevant in a few years. We're looking for the long-term. Maybe it takes a few years to standardize, and by that time it's standardized, no one cares anymore. How do you know to think long-term, then also holistically on the standard. I think one of the problems is that with, it seems like one of the issues that could come up was even with say TC39, the whole proposal system and individual features is that it's hard to think holistically on different things. So you might add, if you add everything individually it makes sense, but then when you combine them it doesn't make sense.

[29:36] **Jory:** Yeah, like it may be a case that because we're operating in this world, the sum isn't really greater than its parts, because together it feels like it lacks cohesion.

[29:49] **Henry:** Yeah.

[29:51] **Jory:** I think that's a complaint people have of the platform, a valid one, frankly.

[29:58] **Henry:** Yeah, a mishmash. This is what JavaScript feels like right now. It's like, are we going to embrace that? It's kind of hard not to, because there's so many stakeholders, like you said, or users, or different use cases. It's like, what is JavaScript? I think people have also talked about how JavaScript is not really owned by anyone anyway, so there's not... And it's a good thing and a bad thing, because they can do anything they want, then there's no... It's like you want that one person to decide the vision of JavaScript is this, like this committee. [inaudible 00:30:33] reason on that, maybe that's good, maybe it's bad. It's just how it is.

[30:37] **Jory:** Yeah. It is definitely how it is right now, but that's exactly right. I think the committee a lot of times gets a lot of valid complaints, because it seems disjointed. There wants to be a roadmap of some kind, but at this point JavaScript is so ubiquitous, it's used in so many places and so many different ways that it almost seems like it would be an insurmountable task to come up with that roadmap. To that end, maybe we need to kind of think about... And this is one of the motivations I think in a way behind TC53, which is the new kind of sister technical committee for 39, where we're focusing on JavaScript in more IOT type settings. Is there a secure version of JavaScript? Is there an IOT version?

[31:55] **Henry:** Like without splitting away?

[31:58] **Jory:** Right, exactly, without, is there some kind of subset, or are there some new APIs that we need to service that use case?

[32:11] **Henry:** Yeah. I mean there are definitely constraints that the committee, specifically has put in, I guess that's true for any standard, but JavaScript is like a whole, there's one JS that is, once you add something in, you can't get rid of it, deal. Then it's what you can do. Then also not adding multiple modes or different years for certain things too.

[32:32] **Jory:** Yeah. A lot of people complain about that, but I think, I value a constraint like that. I think constraints-

[32:43] **Henry:** Are-

[32:44] **Jory:** Yeah, I think they help make solutions more creative. You also have to think about the consequences of adding something in, if you know that the stakes are really high. You can't... So I hear people who say that, but I-

[33:08] **Henry:** Yeah, it's just hard. I think especially online, it's like you can simultaneously have people that think that the standard moves too fast and too slow at the same time. Then you're kind of wondering, well what do I do here? I feel like that with even what I'm doing as far with our project, which is very related to the committee itself. It's also a weird intersection there. You feel like lose-lose.

[33:39] **Henry:** Every decision is not going to work out that well, because they're not... Like the whole situation is not that great, but we're all using it, so it's like either... I mean it seems like for most people in that situation, the answer is just use something different. It's like for the people it might be not to use JavaScript, or make a new language, or continue to stick with it.

[34:03] **Jory:** Yeah. It's tricky. It's tricky, it's so tricky.

[34:08] **Henry:** Yeah. My next question is kind of around how, well there's the standard process, but then there's like the standard itself and how that evolves over time. What is the life cycle of a standard?

[34:25] **Jory:** Yeah, that's a great question. Again, it's kind of one of those things you have caveat with, it does depend on the kind of standard that you're creating. One of the fundamental principles of a lot of the formal standards developing organizations is that the output, the standard itself, should be available in some form in perpetuity. So that 10 years later if somebody really wanted to, they could implement that standard in their product or whatever.

[35:04] **Jory:** Following whatever rules the SDO might have had, depending on how long the working group or the committee really thinks the technology needs to serve. Sometimes it's not that long, sometimes these things are created with the expectation that they will be obsolete in a few years. That's okay, because they're planning that up-front. You know what I mean?

[35:35] **Henry:** That's really interesting. Because I feel like, especially in open source, you're not thinking about that. You're just like, I want my thing. It's for me, and I don't care. Or I want this to be long-term.

[35:45] **Jory:** Right. The idea that a technology can have a planned life cycle and be deprecated is a very common like okay idea in standards. But it's not really in open source as much. I would love to figure out how to talk about project succession planning and project, those kinds of life cycles for open source projects. This is a tangent, I'm sorry.

[36:22] **Jory:** I've been thinking a lot lately about how we have a lot of open source projects and things that have, especially in the last 10 years, that got super popular and then just like that they were passe. But we've got all these applications, we've got all these sites using them. So there's like this sort of, the analogy I have been describing is sort of like a garbage-

[36:47] **Henry:** Garbage dump, yeah.

[36:49] **Jory:** Yeah, we have like this garbage dump of, yeah. How do we clean that garbage dump up? Anyway, so that's-

[36:58] **Henry:** No, no, no. We can talk about this, because I feel like it's almost like, it's funny, it's like our desire to live forever as people reflects in with work that we do. And that understands like the life and death cycle of people, but also things. Then that's what I feel like a lot, that's what leads to a lot of burn out, because we feel like we have to, when you sign up, which you don't sign up, you just somehow accidentally become a maintainer or something, then you feel like you have to do it forever and leaving is impossible or leaving is really difficult. Or you've already left mentally, but you're still there.

[37:39] **Jory:** You're still there, because if you physically move on, there's who's there? That's a pretty big problem, and I really care about it. I know lots of people who are either currently themselves in that situation, or they have figured out how to move on but they are not satisfied.

[38:01] **Henry:** It's always in the back of your mind.

[38:03] **Jory:** Yeah, because that transition wasn't, it was rough. It wasn't planned for, it just sort of happened in some way that they now look back on that time as something that they're not necessarily ready to reflect positively on the work that they did, because they still feel kind of just upset about how the transition happened, because it could have gone more smoothly or whatever. In open source, we need to think about succession planning for the individual maintainers, and for the communities, and also for the-

[38:44] **Henry:** Overall.

[38:47] **Jory:** Overall, yeah, web ecosystem. In the standards world, that foreplanning has been baked in to a certain extent to the process. That would be something that I would really like to try and break into.

[39:07] **Henry:** Yeah, because even just in our culture, we have BDFL, for life. That's already reflected in the culture. Even if you want to leave, it's like it's an expectation. Then yeah, we were talking about this earlier too, of open source and the culture is around being inclusive and welcoming as many people in as possible. But if we can't even figure out how to get people out, then that is leading to even more issues. All we're doing is inviting people into misery, I suppose.

[39:39] **Jory:** Right.

[39:39] **Henry:** Maintaining something they don't know how to get rid of. We should figure that out before, not before, but like while we're figuring out this other stuff.

[39:46] **Jory:** Right. It needs to happen hand-in-hand. At the same that we're really putting a little bit of pressure on these communities to open up their contributor base and invite more people into their communities, if they have unmet needs, one of which might be the need to get the hell out of there, which is valid, then how can we help facilitate that? How can we help them? That's something that I care a lot about. I haven't figured out exactly, it's one of those deals where it's like an individual person, here's what we can do. But how to sort of make that a broader pattern. I don't know yet.

[40:36] **Henry:** Yeah. It's like I don't know if you could standardize that kind of thing. Even just knowing that people leave is, that in itself is interesting. Knowing that like, oh, people actually, because we can say all day, "You should just leave the project," or "You should just quit," stuff like that. But if you're not actually living that out and seeing other examples, you're not going to feel willing to do it.

[40:59] **Jory:** Yeah. You're not going to feel like that's actually a step you can take.

[41:00] **Henry:** Possible.

[41:01] **Jory:** A possible step you can take. One thing that, within the OpenJS Foundation, which is the new foundation of the merged Node and JS Foundation, it's now the OpenJS Foundation, we brought Node, Libuv and Express from the Node Foundation, and 28 some odd other projects from the JS Foundation, probably five or six of which really functionally are done. They're complete. We decided to call those projects emeritus projects. I argued for this name specifically because to me it connotes-

[41:44] **Henry:** A graduation.

[41:44] **Jory:** Like a level of respect, like thank you for the contribution that you made to the ecosystem, but we respect now that your work is functionally done. I hope that's one small thing that just sort of says, it's fine. It's a good thing if you feel like the work here is done. Let's turn this into something to celebrate. Let's help you as a maintainer feel good about the community that you have built, the effort that your team put in. Let's celebrate that. That's one small step.

[42:26] **Henry:** Yeah, I think for projects, even like for... I guess we use the word alumni, which is basically the same. Then I've seen other projects do the same, where once a contributor steps down, they get added to this emeritus list. Like what you said, it's like a badge. When you leave, you have to do that hard thing of removing them from access to all these things for security reasons, but we shouldn't erase their contributions obviously. They did a lot of work, and it's important. Maybe just as much as we celebrate people joining the team, we should celebrate them leaving too. Don't make a big deal about it.

[43:05] **Jory:** Yeah, that's something I would like to see just as a pattern generally, whether it's an open source contribution or somebody leaving your company. One thing that we did at Bocoup, which was weird for a lot of people, but a lot of people always came up to me and thanked me for it. When somebody left the company, we wrote them a farewell post and celebrated what they did, what they brought to the team and that kind of stuff. My colleague, Mike Pennisi wrote a lot of wonderful posts over the years, and people just love that. It didn't erase their time here at the company.

[43:49] **Henry:** Yeah, for sure. I want to get back to the standards. Well I guess my questions around how do you know what someone's adhering to the standard. It's almost like verification of the standard. Because the standard is a document which in a sense is kind of like a language/code. I was thinking about with TC39 we have tests, there's a set of acceptance tests that's [inaudible 00:44:15] difference so that you know that a JavaScript engine is actually do JavaScript right.

[44:23] **Jory:** Yeah, yeah. That's a great question. In the past when they would produce a standard, again, these were largely for physical goods, it was this very descriptive document. You knew that it worked because when you made it, and you plugged it into the other thing it was supposed to be interoperable with, it worked or it didn't. A good that failed was just going to fail, so you knew that it didn't really adhere. But over time and on the digital space, the idea of what a standard is has shifted from this notion of, well it's still just a document, a standard is still just a piece of paper with steps written on it. To it's a document and a test. I'm sorry, a document and an implementation.

[45:20] **Jory:** You have to have both things for this to really be something that we consider a standard. Then thirdly, I think TC39 and the W3C's web clock on [inaudible 00:45:35] community is another longer running example of this I think, are starting to really push forward this idea that for us to have a web standard we need the document, we need the reference implementation, and we need the tests. The next version of that is going to be all three of those things and documentation.

[45:56] **Henry:** Right, examples and stuff.

[45:57] **Jory:** Yeah, yeah. I think what we're going to see is like this growing set of criteria for real, I'm using air quotes here, "real standards" are that document, the tests that are ideally something that you can both consume and then upstream your own contributions to and kind of treat in somewhat of an open source capacity their reference implementation, and documentation on MDN probably.

[46:28] **Henry:** Yeah, yeah, of web based stuff.

[46:30] **Jory:** Yeah.

[46:32] **Henry:** You brought up wanting to get more people into standards. I guess what's your current thinking on do that action?

[46:42] **Jory:** One thing is that, first off, I hope everybody finds standards as interesting if not more so than I do. First off, what we just started, I hope that you find this interesting, and if so, super, that's like a great place to start. From there, one of the challenges is that a lot of our standards organizations don't have good on-ramps for people who care about these things but aren't affiliated with organizations that are dues paying members. This is a complaint about the standards developing system. You have to be, and this is really old, but you have to be a member in order to quote "have a say" or have a vote, or participate in some meaningful way in the work of a technical committee. Some groups have invited experts.

[47:36] **Henry:** Like me, I guess.

[47:36] **Jory:** Like you, some groups have a Henry, and these are folks that the committee deems have critical expertise that the committee needs in order to consider all aspects and facets. But there's a lot of burden on invited experts, because unlike the case of a dues paying member, they probably don't have the funds to travel.

[48:03] **Henry:** Mm-hmm (affirmative). Which is why I only go to the ones where I live usually.

[48:10] **Jory:** Right. This is a shared problem in W3C and other groups as well. That is a problem space that we need to tackle if we're going to figure out within these older systems where the organization itself, the operation of the organization is funded by dues from members, which is important. How do we make sure that the organization continues to function and provides the services that it provides, and we have space for invited experts and others from the community to come participate without necessarily having to pay the large sums of money that groups like Google or whatever Microsoft pay? That's one thing.

[49:03] **Jory:** Another area that people can kind of, I don't want to say hack the system here, but it's a little bit of a system hack, is that a lot of these organizations have not-for-profit members. These are universities, they're governments, they're non-profit foundations that are participating in the work of a committee. A lot of times, they are in the same boat in that they can't necessarily fund travel, but they do get a seat at the table. They do get invited to the meetings, they do get to weigh in on committee matters and that kind of stuff. There's certainly a possibility, especially for those who might be affiliated with a university, to participate in standards work that way.

[49:59] **Jory:** One thing that we're hoping to do at the OpenJS Foundation is, because the OpenJS, slash, entity formerly known as JS Foundation has a not-for-profit status for the W3C and the Ecma International, is to figure out how we can sort of serve as a bit of a funnel for our project communities to provide feedback into specific working groups from their broader community work. [Dan Erenberg 00:50:29] actually has done a lot of work to kick some of this thinking off with his outreach groups around education and frameworks and stuff like that and tooling.

[50:44] **Henry:** Totally. I was going to bring it up too, it's almost the question is, what is the goal of all this? Is it the goal to bring more people to those meetings, or to get people involved in general? It's like, the same with Open Source. Maybe it's fine for people to just feel comfortable and to get out issues, maybe they don't even want to be in the meetings. They just want to be involved. These outreach meetings with specific groups of people, whether it's educators or tooling, maybe that's enough to give the feedback because they don't need to be in the meeting if someone can represent them.

[51:13] **Jory:** Yeah. I'm hoping that most people would agree that what is necessary is to ensure that their concerns are being heard, and that their concerns and needs and use cases are being recorded somewhere and considered. That's I think the number one problem to solve. Then there's this other pass that I think helps make a standard more universal and more inclusive, which is the pass of have we gone and considered among specific communities of possible stakeholders who don't always have a voice.

[52:03] **Jory:** I'm thinking here of like, if we've got a networking standard that we expect to do X, Y or Z, and we haven't spoken with groups that build technologies in environments, like in rural Africa for example. We need to be making sure that everybody is getting a chance to have eyes and to have a say in a standard that they may end up needing to, or being stuck with, which would be like the worst case scenario, that they didn't necessarily have a say in. I think that's really important.

[52:55] **Henry:** Yeah. It sounds like just government I guess.

[52:57] **Jory:** Yeah, it is. I think we're kind of seeing this on a little bit more of like, in an acute way with AI technologies. There's this story out right now about San Francisco banning AI for law enforcement, that kind of stuff. There hasn't been enough analysis among experts who focus on algorithmic bias and that kind of thing in those spaces. So it's like we shouldn't just, it shouldn't be ready-fire-aim.

[53:35] **Henry:** Right, right, yeah.

[53:38] **Jory:** Yeah. It's a lot of thought stuff.

[53:41] **Henry:** Well I guess lastly then, I want to bring up another topic you're interested in, which is how to... We're talking about committees and standards, and ultimately it's about people. How do we build the community, but also the leaders what will shape the future of where we're going? I guess, it's funny, even on TC39, we have champions. We call them champions. Those are the people that push those specific things forward.

[54:14] **Henry:** A lot of times, I feel like people will say that if there's not at least one person taking ownership, it kind of doesn't really go anywhere. It just kind of stops. How do we have that? It's the same problem in open source too. People can kind of do their own thing, but then they need someone or a group of people to kind of lead things with a vision, an idea.

[54:36] **Jory:** Yeah. That's sort of like the problem of, if everyone's in charge, no one's in charge. I think that's the way the saying goes, or if everybody's responsible, nobody's responsible. There's some version of that. We have this misconception that the work is all technical, that what matters is achieving the correct technical outcome. Beyond that, who cares? Okay, well, wrong, because first off, there's no such thing as a correct technical outcome. It's just a decision A versus decision B. Decision A may set you on one path, and decision B will set you on a slightly different path. It's just which reality do you want to live in?

[55:32] **Henry:** It's trade-offs.

[55:34] **Jory:** Yeah, it's trade-offs, exactly. The technical interoperability problem, that's not really that... It is hard, but it's not that hard compared to-

[55:46] **Henry:** Well, in some sense it's the easiest part, because people are harder.

[55:51] **Jory:** Exactly. People are the hardest part of software. The way I have been thinking about this for a while now is like, how can we solve the human interoperability problem, which will help improve a lot of our technical interoperability problems? One of the things that I've been active in lately is TC39's code of conduct group, and other codes of conduct groups. To me, those aren't about seeking out bad behavior and punishing them.

[56:38] **Jory:** Rather, how can we create environments where people feel like they can come and give their best selves to that committee, and produce work that they feel good about it in a way that they feel good about. That sort of creates something more of a positive cycle, a virtuous cycle of technical production. We think about it at TC39 in our code of conduct group as something of a culture shift activity. The older school standards bodies and the technical committees have been around for a long time, and the TC39 has been around for 20 plus years. That's a long time.

[57:30] **Jory:** They have a little bit of this like, forgive me, but it's a little bit like the gray hair problem that a lot of our younger participants kind of want to change a little bit. We want to feel fresher, more responsive, more open to healthy debate, as opposed to kind of maybe the older school thinking around some person at a lectern preaching for hours. That's part of this shift. I think it's something that has happened not just within the standards, but certainly within a broader culture.

[58:18] **Henry:** Yeah, a broader culture.

[58:18] **Jory:** Yeah.

[58:18] **Henry:** Yeah, I mean even like at the meetings, now they have mics, and there's like a whole queuing system with the-

[58:25] **Jory:** Oh, gosh.

[58:26] **Henry:** Versus before, I guess people were raising their hands before, but even before that, you just talk, and you just argue, and then kind of wade through it. Shout over each other kind of thing.

[58:35] **Jory:** Yeah. It is night and day difference. I wasn't even, I didn't even go to all that many meetings, but even just in the last two years since I've been going a lot more regularly, it just feels like it's a little different, it's a little better. It gets better and better each time, I think. But I think I'm noticing that people are more considerate, they're more measured. I hear the words "Thank you" way more than I ever heard before.

[59:15] **Jory:** I do think some of the tools that we've brought in, [Brian Charleston's 00:59:19] TCQ app. Those are all little techniques, so I'm hoping that we can bring in more, I don't want to call it sociological tricks, but they're little behavioral dynamic changes that we can make to make the work of the committee just make everybody feel better.

[59:44] **Henry:** Yeah, you're not like purposely trying to make things emotional or anything. At the same time, we were talking about this earlier with the whole feeling that science, people wanting to be objective with the standards, it's all about the technical. It's like, you have to remember we're all human, and we interact. The whole thing of saying thank you.

[01:00:01] **Henry:** The same in Open Source, when people [inaudible 01:00:04], you can still say that first, even if you have some kind of [inaudible 01:00:07]. "Thank you for your input," whatever it is. They forget that it's not that you don't care about technical, but... I feel like it's really hard for us to say, and. It's like technical, and this other thing. We always want to create this dichotomy between the technical and non-technical. How do we think through the complexity of the holistic view of both at the same time?

[01:00:33] **Jory:** Yeah. There's a certain science to it. We're not trying to make anything more emotional. That's actually far from the case. It's more like, can we help people feel more positively generally happier about the work that they're doing? They're more likely to do better work in the committee if they feel happy about it. You don't do your best work when you're miserable. I mean that's true, so how can we change that?

[01:01:12] **Jory:** How do we do that by giving people good techniques and tools? How do we do that by finding good, even just like training classes for people who, maybe they're fantastic technologists, but they aren't good at running meetings. Well, let's look at what it takes to run a good meeting. Let's do a quick 45 minute lesson on running effective meetings, that kind of stuff, just to help them be the best version of themselves they can be.

[01:01:44] **Henry:** Yeah, no I feel like that is lacking in Open Source too. Everyone gets into it because of the code and commits, and graphs and stuff. Then when you become [inaudible 01:01:57], and you realize you are lacking in every other way. Those other things somehow end up being, well it feels more important because you're lacking them. You realize, oh, I don't know how to set up a meeting. Do we need it? How do you make releases, and how do you talk to people, and sales and networking, and all these aspects that are like, I guess it feels like a company or standards, a community. All these other things that, they're all tying back to code, but you don't learn them in school or anything, like people stuff.

[01:02:31] **Jory:** Yeah. Well, that for me is the more interesting part. I don't say this too often, but most of the time I don't, I care about the technical outcome, yes, but I kind of by way of example, I say, "I don't really care about that." There are a lot of smart people, a lot of people who are a lot smarter than me about these technologies. I will leave them to make the best technical decision. My job, the whole think that I will emphasize is, how can I support those people to be the best, feel the best, have the best support they can, the tools and resources around them so that they feel equipped and good.

[01:03:18] **Henry:** I think this is a good place to stop. I guess just to end, if people want to reach out to you or want to hear about what you're working on, or I guess what are you working on now?

[01:03:32] **Jory:** Yeah. I'm working on the OASIS Open Projects program, which is a new program for open source projects or technical committees to work in the same sort of organizational umbrella and under the same system to produce a formal de jure, like that's official, standard, as well as different open source efforts. If you want to talk more about open source and open standards and that bridge, or if you want to talk about just general sort of leadership and communication for these kinds of communities, I am here to help at @jorydotcom.

[01:04:19] **Henry:** On Twitter.

[01:04:19] **Jory:** On Twitter, and GitHub, and Slack, and IRC, and Signal, and WhatsApp, or whatever.

[01:04:27] **Henry:** Okay, awesome. Thanks for joining me today.

[01:04:31] **Jory:** Of course. Always a pleasure.
