---
title: "Getting Old in Open Source (Mikeal Rogers)"
season: 2
date: 2019-04-29
time: "83"
description: How old is open source anyway? Mikeal Rogers (Protocol Labs) joins
  Henry in talking about making friends through podcasting, conference
  organizing as maintainer-ship, patronage and fundraising, old/new school open
  source, deprecating packages and ecosystem health, new ideas and becoming a
  maintainer by being the 'first', and parenting!
episodeLink: https://anchor.fm/s/ff707650/podcast/play/96461825/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-11-31%2F392345777-44100-2-af1bf9b27fb3c3dc.mp3
embedUrl: https://podcasters.spotify.com/pod/show/hopeinsource/episodes/MA-4-Mikeal-Rogers-on-Getting-Old-in-Open-Source-e2su9i1
sidebar:
  order: 4
quotes:
  - text: "Open source is a really organic process that seems to mostly be working. People seem to get things done. They seem to communicate. It's definitely better than it's ever been."
    speaker: "Mikeal"
    timestamp: "24:03"
    topic: "Community & Belonging"
---

[00:07] **Henry:** Yeah, today, I have with me Mikeal Rogers. I feel like Mikeal's been around for a pretty long time, especially in open source. I don't remember where I first met you or heard about you. But I mean I definitely knew that you worked on Node. And then probably feel like I talked to you a lot more after you made RFC with Nadia.

[00:26] **Mikeal:** Right, right. Well, we had you on, and then, yeah, we just kind of kept talking after that as well.

[00:30] **Henry:** Actually, that's kind of interesting. I feel like podcasts are a really great way to get to know people. You talk with someone for a whole hour, or whatever it is, and, I don't know, it's different. Not that, you meet people in person, and I feel like that's a huge thing. But then at least if you're communicating online, it's a lot more I guess intimate than Twitter or something else, right?

[00:56] **Mikeal:** Yeah, yeah. I'm actually I'm starting to consider starting a podcast with a friend of mine who whenever we get a chance to catch up, we have these really great conversations. And we don't have them enough. So I'm like, "Why don't we just set up [inaudible 00:01:11] week for us to have the conversation, and then we'll just publish it?"

[01:15] **Henry:** No, that makes total sense. I feel like that's how a lot of podcasts start, right?

[01:19] **Mikeal:** Yeah.

[01:20] **Henry:** You just have someone you like talking with, and you're like, "We might as well make it public." I feel like that's exactly what we did for Hope in Source. Yeah, it was just like, why not, right? I feel like then you don't have too much pressure about making it good because you at least enjoy it yourself, which probably says a lot about open source too, right?

[01:41] **Mikeal:** Right, right. Also you did that one as a season and then released it Netflix-style. And that's really nice because I've done podcasts that are weekly, and I've done ... With RFC with Nadia we did seasoned. And that was nice because we got to just kind of prepare a season and think about the guests for that time. There was still some time pressure to knock it out on a particular schedule. And then I was on a weekly one for a while on The Changelog. And that was really stressful actually to always have to be available for that and be really consistent.

[02:10] **Mikeal:** But, yeah, with Hope in Source, people didn't even really know that you were doing it. I think you mentioned it to me, but unless you told somebody, they didn't know that you were doing it, and then you just released all of it. It was so nice. You got to take as much time as you wanted.

[02:22] **Henry:** Right. I think that surprise factor actually help. It helps everyone else be more interested, and then you yourself you're not worried. You could just not do it, and it'd be fine too. I feel like I want, I guess this podcast I didn't do that at all, or I wanted to, but I was like, "This is taking too long. I'll just release it." But I don't feel the pressure to do it every week. I don't know, I guess I feel like with the podcast, there's not a lot of rules into what you can do. You can make it super long, really short, the way you release it, who you talk to. I was even thinking, why do people only talk to the person one time? You could just have multiple, and it doesn't really matter.

[03:04] **Henry:** So I think just feeling that out is fine. It's just when people, when it gets popular, people start demanding things. It sounds exactly like open source again. Maybe that's why it's fun because now, nobody knows. I think we only had 500 downloads for this one.

[03:22] **Mikeal:** Yeah. I don't know. I listen to a lot of podcasts, and they really stretch to different formats and stuff like that. Some of the ones that are really produced I really love and enjoy. But also some of the ones that I listen to the most consistently are just simple interview ones, and they'll bring people back several times [inaudible 00:03:40] like that. I think the long-form podcast has [inaudible 00:03:42] on every other year basically and [inaudible 00:03:45]-

[03:46] **Henry:** Yeah. I think if it's 10 minutes, some people like that. And the other ones are like three hours, and people listen to the whole thing. It's interesting.

[03:54] **Mikeal:** Yeah, yeah. Some of those feel a little meandering to me. They seem a little bit too long.

[04:00] **Henry:** That's true. I guess there's this balance of how much editing you ... How much do you want to do yourself or you're going to start paying people? And I was like, okay, I was editing the podcast before, and now I might as well just pay someone. And then also the transcripts, stuff like that.

[04:16] **Mikeal:** Yeah. Now, you're running a business basically. So you just signed up for a side hustle.

[04:23] **Henry:** Yeah. It's funny how you end up, the thing that you turn into your job you find ... You always find some side thing. But I feel like they're all related. I feel like we have to justify to the world that, especially in my case, if you are doing this thing you set out to do, I didn't want it to be too specific, too vague because then it limits what I feel like I can do. But people change over time, right? This has been a whole year, and now, I'm like, "Okay, I want to do a bunch podcasts." And it's not like it's a different thing. It's still about open source, right?

[04:54] **Henry:** It's funny how I keep thinking podcasts and open source are the same, going back to thinking that the thing that you think about you turn everything into that thing. Yeah, it's interesting.

[05:05] **Mikeal:** Yeah. And you have the same maintenance problem, right?

[05:07] **Henry:** Yeah. Yes.

[05:08] **Mikeal:** Once you do it, people just expect you to keep doing it.

[05:12] **Henry:** Right. Actually, this happened recently. Someone just tweeted, "Hey, Nadia, Henry, when are you going to make another episode of Hope in Source?" We're like, "We're not thinking about it right now, but maybe."

[05:26] **Mikeal:** Yeah. When I started running NodeConf, people just expected immediately that it would be a yearly thing. There was no question, like, "Oh, yeah, so you're doing this next year, same time?" I moved the venue, and they were like, "What? Why?" And I would get really bored at doing the same thing. So everyone had a slightly kind of format to it. And I was always iterating and being creative about the format. And some people really liked that and loved the iteration of it. And some people kind of hated it. There's certain people that really want to do the same thing every year for some reason.

[06:04] **Henry:** Yeah. I was just thinking that. I feel like, well, if they're more on the, I don't want to say consumer side, but just want to be there, they probably want that consistency and almost like nostalgia, right? But then if you're the one organizing it, you're just like, "I'm doing the same thing over and over. I'm getting bored, or can we move?" Because you want to feel like you're progressing or something, right?

[06:24] **Mikeal:** Yeah, yeah, I would always tell this. So in the early days of NodeConf, so Chris Williams helped me out running it. I mean he set it up. He ran the back of the financing and everything, because I had run a conference for CouchDB, but I was working at the CouchDB company at the time. And so I just had a corporate credit card. There was no sponsors or budgeting. And I was like, "I need to figure out how to do this for real." And Chris offered to help. And so we did NodeConf and JSConf kind of together back-to-back in Portland. And I went there and helped scout venues, and he ran the whole financing side.

[07:01] **Mikeal:** After that, Chris kept helping people start up conferences, and I did too actually. Since he helped me, I really felt like I needed to help other people. And the advice that I kept giving people is ... They really wanted to go, "Well, how did you do this? And what kind of venue for this?" And I was like, "You should put your own spin on this a little bit," right? "Here's why we did certain things and the kinds of constraints that we had. And in particular, here's the things you need to do to sell tickets and not be financially in debt at the end of this."

[07:30] **Mikeal:** But the big stuff, like where you do the parties at and what kind of food do you do, I'm like, "Well, what does your city have? What is cool about where you are? Show it off. You're inviting a bunch of people to come basically to your house. Show it off." And the ones that I think took on the most of their own character ended up persisting the longest. Nodevember is really into Nashville, and DinosaurJS is really into Colorado and stuff like that.

[07:55] **Henry:** That's really interesting, because it's taking advantage of the location, the space versus making it very specific a niche rather than just generalizing everything.

[08:05] **Mikeal:** Right, right. And O'Reilly Conference, they'll move cities, and it's the same event. There's nothing different about it. It's just somewhere else.

[08:13] **Henry:** It's kind of like franchising for McDonald's or something in a way.

[08:18] **Mikeal:** Yeah. And we always had this approach with the community conferences. There was no big media company looking to do a JavaScript event at that time. There was no big people that wanted to get money into that. And so we said, "We have this huge community. Rather than try to do one event or try to make our events into the big event, let's just do a lot of small events, just get more people running two- to 300-people events rather than one that's 3,000 people or whatever."

[08:47] **Mikeal:** And I think that worked out a lot better. One of the problems that we had, though, in the conference community was that when the media people did show up, it changed the financing a lot. O'Reilly eventually starting doing Fluent, which is a 1,000-person conference. And there's a few other bigger events as well. Also when the Node Foundation came on board, that turned into a much bigger event around Node, stuff like that. And when that happened, it's a lot more money.

[09:14] **Mikeal:** But the weird thing about conference costs is that there's not a linear cost progression in conferences. Once you go over four or 500 people, everything gets more expensive per head. The venues that you're in are bigger and not as cool and more money. The catering is much more expensive, and you have much fewer options. So when you're at a giant conference that's 1,000 people, those little sandwiches that they give you cost \$20 apiece. It's unbelievable. You have no options, so they know that they have you, that you're captured.

[09:49] **Mikeal:** And so they start bringing in all the bigger sponsors, and the sponsors are paying more money, but they also have more expectations. So they really expect that they're going to get a booth, and it's going to be in the space and da, da, da. When you're starting to do something a little bit more creative and community-oriented, you don't have booths. You don't have badge readers and things like that.

[10:09] **Mikeal:** So when those expectations change, those sponsors pull out of the community events. And so without that level of financing, the ticket prices have to come up to cover the event. And you've already set expectations with people. The tickets cost a particular amount of money for a particular quality of event. And without the sponsorships, you can't make that math work. So at some point, the events that I was doing when I was getting more creative, I started just saying, "I'm not taking sponsors. I'm not going to go through this thing again where in five years, people have completely different expectations about what this should cost when there's no more sponsorship money."

[10:46] **Mikeal:** And that didn't actually go very well, to be honest. There's a reason I don't run events anymore. It's because you literally can't get people to pay what they cost. And dealing with the sponsors is not actually worth it or any kind of fun.

[10:59] **Henry:** I mean it's interesting because I feel like that's not that different from doing Patreon or even open source when we start getting funding, and it changes people's expectations too, right? It's interesting.

[11:11] **Mikeal:** I mean I knew that it would change people's expectations. I will say that I was wrong about how they changed and in what models that they changed. And this was something that I learned doing the podcast with Nadia actually, was that I thought it would be worse to fund individuals than to fund projects. I thought that it would create weird incentives for the person to kind of hold things hostage because it's now their direct livelihood and that funding the project would be better.

[11:39] **Mikeal:** And I actually had it completely reversed. I was completely wrong, where when you fund individuals, you have a compact with them, not with the project. So they have no incentive to hold the project hostage. They can do another related project that you might care about, and you will still be happy to be paying them. You're paying them for their work in an area, whereas a lot of projects that we talked to had a lot of problems spending the money and changing the incentives in the project around how to allocate the money and all of that.

[12:09] **Mikeal:** And, yeah, so I just had it completely wrong. And that was interesting to figure out just through the process of talking to different people with different models, including you.

[12:17] **Henry:** Yeah. It's funny, really relevant to me now because I forgot when ... Well, that was obviously before I quit, but that podcast episode, but I don't know. I think, yeah, because I think when we talked, I was still, I was working at Adobe, and they were paying me to do it half-time. And we were talking about the conflicts with just even corporate sponsorship where if you ... well, not compromise, but if you're spending half your time on, quote/unquote, the regular work that other people are doing and then this open source work, there's still that dichotomy and then you just feel bad. And then even if it's your job to do it, you feel not that you're not appreciated. It's just everyone else is thinking about other things.

[13:07] **Henry:** And I feel like now, yeah, I agree that funding a project is hard, because I have to deal with this now in both the Open Collective and the Patreon where obviously the Patreon's so much easier because, yeah, you don't have to think about where it's allocated. It's going to you directly. But then it's Open Collective, it's all right, how are you going to allocate? And are you going to pay the core maintainers? Are you going to pay random contributors? Are you going to pay your dependencies? People were suggesting that too. Or are you going to pay me where I decide to do this full-time? So are you going to pay ...

[13:42] **Henry:** In my mind, it makes sense, even though obviously I'm biased now, that you would pay full-time people then other contributor maintainers and then everyone else, if that even if possible? And I feel like at that point, it's better to spend a lot more money on a few people even though I guess it seems like you're, what is it, biasing certain people. It just feels like that money's more well-spent when you're not distributing 1% of it to 100 people.

[14:09] **Mikeal:** Yeah, yeah. So I was just remembering, when I first met Nadia, I had read her article when she was first getting involved in the topic. And my impression was that she saw it as a financing problem. And so I really walked into it thinking, "I need to unwind ... It's not a money problem. It's a time problem. And it's like a contribution problem getting people to contribute in a meaningful way and to the right things. But it's not necessarily a money problem." And she was already there I think. She had talked to enough people that she had a much wider view of it and was thinking about it more just in terms of general sustainability.

[14:51] **Mikeal:** But I remember coming into it going, "That is not the biggest problem. The money's not the biggest problem." And then when Open Collective started, and nobody was really even getting funded yet, but it already was like, "This is the solution to [inaudible 00:15:05]." Just the tone and the ... People in open source were just like, "Okay, all right, this is fixed now. You just raise money." And I was like, "I don't think that that's the case." And they were starting to just associate raising money in Open Collective with being sustainable.

[15:22] **Mikeal:** And then when we talked to ... I forgot his name, the guy who manages [Moca 00:15:29], or he maintains Moca. They did an Open Collective. And he told us that ... That was one of the most telling conversations that we ever had about that stuff because he was like, "Oh, yeah, we're having a really hard time spending the money because some people in the project feel like you shouldn't be paid to do any of the fun things." So he wanted to break off a thing that he wanted to do and then carve out some time away from his work to do it and get paid.

[15:53] **Mikeal:** And they were like, "No. That's a fun thing. You can't do that." And I was like, "So, wait. So the solution to open-source sustainability is to pay people below market rate to do things that aren't fun? Really? That's our plan?"

[16:07] **Henry:** Yeah. How did we get into that situation?

[16:12] **Mikeal:** It was just unbelievable to me.

[16:13] **Henry:** That sucks.

[16:14] **Mikeal:** Yeah. And it's not like ... They were already not paying people well for their work. That podcast and also just Nadia's work in general has really widened the conversation about sustainability and made it about more than just kind of funding, funding as a tool. And we keep getting more tools for different types of funding, and trying that out has been really interesting to see.

[16:35] **Henry:** Yeah. I mean I felt like money has never been the solution, but it's more like ... Some people think that's it, and it's that simple. They just need money. And other people are like, "It's just going to make things really complicated." And I think it's, can we say both? It's going to be complicated, and we need it. But it's not the end all, be all. And we have money now, and I'm getting paid to do it. I almost feel like either myself or other people are like, "If you have money, then suddenly the output of this project is going to be 20 times better."

[17:11] **Henry:** Not really. Actually in some sense, we're releasing less. And maybe that's okay because I had this pressure to feel like I had to keep up with this whole hype cycle and making releases every week or whatever. And it's not healthy. And I think what I really need with money is more, I just want to be able to not burn out, not to say the more money we get, the more code and more features and whatever. It's just making sure we can actually continue doing this.

[17:41] **Mikeal:** Yep. It's a tool. And I mean the best thing for the project and what people want out of the project may not be more releases necessarily. I mean not if more releases come with a level of instability at least, if you're trying to crank them out as quick as possible. Yeah, I mean money is always just a tool. And I feel like I have a very different perspective on this than most people I talk to because if you're from an older generation of open source, of which I was sort of actually involved in ... I shouldn't talk about them like they're completely separate from me. I did do open-source work in that model and with those projects for quite a while.

[18:21] **Mikeal:** But I certainly did not feel like open source was part of the rest of the tech industry at that time. Open source was its own special thing. And even though all this money was coming in and all the people that I looked up to were basically tenured at Sun or whatever, somehow we maintained some kind of moral aura of superiority. It was the only thing that open source kept from free software was that it's morally superior. And thinking about it as this separate kind of unique snowflake is really important to a lot of those people's identity.

[18:56] **Mikeal:** And I think that when you talk about the money and the funding and that kind of stuff, it's just dirty to them. They don't want to consider that part of the problem part of the thing they're talking about. And they don't really want to acknowledge the intertwined relationship between the rest of the tech industry and open source. They want to talk about how open source has won effectively, but they don't want to talk about what that really means. It means that open source is held up by all the money from tech.

[19:25] **Mikeal:** And then I think a newer, younger generation of open source is really interested in this idea that ... And I think part of this comes down to I'm at the oldest end of millennial, right? I was born in '83. But as all of the sort of economic opportunities have kind of fallen out for this generation, they're always looking for side hustles, and they're always looking for a way to be independently financed, to not be dependent on a company because companies become so ephemeral. And so there's this huge focus on paying me directly to do this open-source thing that I want to do. How do I get paid to work on the thing that I want to do on my own in some kind of independent funding strategy separate from the rest of the tech industry?

[20:02] **Mikeal:** And my view on open-source sustainability in general and open source in general is that you cannot separate open source from the tech industry. Open source is the tech industry.

[20:12] **Henry:** Right. I was going to say that.

[20:13] **Mikeal:** I mean most of the code that you run in proprietary products actually open source. Open-source code enables all of that. Every company in the world uses open-source software. And so to some extent, they're putting into it by using it and finding bugs. And they are also putting into it often in terms of direct development resources.

[20:33] **Mikeal:** And so what that means is that there's already a huge amount of money going into pay people to write code at companies. And if you're trying to break off a section of those people and finance them some other way, how are you going to do that? How are you going to get an equivalent amount of money? We're talking about the most well-paid profession in the world, right? Well, not ... There's a couple niche professions. But the largest well-paid profession in the world, let's say it that way, one of the highest-growth professions in the world and in the industry. Literally all of venture capital and a lot of other capital is going into tech.

[21:12] **Mikeal:** And you're going to have an island that is separate from that in order to fund it and sustain it. I don't see how that's ever going to work. And having run a foundation and run an open-source foundation, had to beg people for money, even having a lot of incentives for companies to give you money that is not just charity, it is roughly 100 times harder to convince a company that gives you $100,000 than it is to convince them to give you half of a person's time that they're paying $200,000 to.

[21:48] **Mikeal:** There's this thing baked into tech companies' heads that hiring people is good, and having engineers on staff is good. And giving money away is bad. And the cost-benefit analysis of that is they're not [inaudible 00:22:02]. They want to see another engineer that's good in their office. That's what they want.

[22:06] **Henry:** So it's like do you want to keep up with this cultural fight or ...

[22:12] **Mikeal:** Yeah. And so what I've tried to do in the last say five years or so is try to remove this line between developers and open-source developers. Everybody is a developer. Everybody's an open-source developer. That's just the world that we're in now. Try to change governance principles and a lot of the ways in which people run their projects, that they're more open to contributions that are at the edges that are more casual, that they're not trying to optimize for somebody that is actually embedded full-time because there's a huge number of developers working on applications that are going to find a bug, just want to fix it real quick, and move along.

[22:49] **Mikeal:** And the more open you are to that, the more sustainable that you can be in the long term.

[22:53] **Henry:** I mean I think that's changing. I feel like a lot of companies are trying to adopt open source practices. And even I don't know when the term "innersource" got introduced, but stuff like that, right? I think it feels like people, culturally, companies are trying to change to be open source without necessarily producing their own open source, right?

[23:15] **Mikeal:** Right. Okay, first and foremost, we just don't know how software gets built. We actually don't know.

[23:22] **Henry:** [inaudible 00:23:22] good admission, yeah. That's good.

[23:25] **Mikeal:** I mean I've been working in this field for I mean technically 20 years, but at real companies, bigger companies for about 18 years. And we don't know how software gets built. It just happens. I mean I've been a part of and even managed every software development process and practice. And, yeah. I mean we don't really understand this at all. I think that we know that people can learn to write code, that we can get them to write code on certain things. If we keep them happy, they tend to write it.

[24:03] **Mikeal:** That's pretty much it. And open source is a really organic process that seems to mostly be working. There are certainly problems at the edges, but it mostly works. People seem to get things done. They seem to communicate. It's definitely better than it's ever been. And so the innersource stuff taking some of those ideas that we're seeing work in practice and trying to apply them to companies, that makes a lot of sense to me. I think that's probably a good practice.

[24:36] **Mikeal:** Where I tend to get called in to talk to companies is when they want to do something big in open source, which is usually they want us to open source a project or add contributors to a project full-time or something like that. And it's funny because I'm one of open-source guys, so they call me in for that. But what I really think we need to be doing is just saying, "Look, all of your developers are open-source developers. Just let them fix bugs in all the stuff they're using because they're using open-source software every day."

[25:03] **Henry:** Yeah. I feel like, yeah, you're right. In a way either ... I actually gave a talk about this recently at [inaudible 00:25:10]. I was trying to say that sometimes we treat the people that are very visible on social media like they're gods or something, right? They are this special type of developer that's open source. Or you don't even know who works on the project, so they're more anonymous people that you just report bugs to.

[25:29] **Henry:** And so either case, you don't think that you can do open source. And so what you're saying makes sense. How do we get people to realize they can contribute back? The whole point of open source is that you can actually be involved in the process, right?

[25:43] **Mikeal:** Yeah. And I mean I think smaller projects are much easier to contribute to. They don't have a lot of these bigger issues. But I do think that we were ... We're still to some extent really caught up in this BDFL notion. And it's like the fallback sort of governance model. And it just becomes really problematic really quickly if you're trying to encourage people to contribute and to stick around and help maintain it. It's not a good model.

[26:08] **Mikeal:** And so I put a lot of time into trying to come up with better practices and principles and document them. And to some extent, I mean it worked. We fixed Node. Node.js works under a lot of those principles. But I don't know that we've really changed the culture in a significant way.

[26:27] **Henry:** Right. Well, I guess it also is BDFL works for those small projects, right? And it's more that when they're trying to transition, how do they do that? And maybe it's because they're caught off guard where, like what you said, projects randomly get super popular and then your little pet project randomly becomes the thing everyone uses. And they weren't intending on it to be like that. And then there's no support structure. And we're trying to figure out how to create those guidelines to do that.

[26:58] **Mikeal:** Yeah. And doing that from scratch is always really hard. I mean I've had to do it. It's tough to go out on a limb and say, "This is how we should run our project." It's unlike how any other project runs, whereas BDFL is sort of simple. I make all the decisions. It doesn't need to be documented. It's how Linux works I guess, not really, though, in practice. But it makes a good tagline or whatever.

[27:26] **Henry:** I kind of want to go back to what you were saying about value actually, or values. And I guess I was reading Steve Klabnik's article that he did recently about what comes after open source. He was talking about the difference between I guess what you were calling old-school open source, like free software, and then this new group of people. I guess I'm part of the GitHub age.

[27:53] **Mikeal:** Well, yeah, I guess I was even talking about ... So the open-source folks, he hinted at this, but free software was sort of even before the people that I'm talking about. I think he's mostly talking about the Apache-era people in that and open-source-definition people. And they have a very big split with the free-software folks. And I think that he is going to get into that in the future.

> [What comes after "open source"](https://steveklabnik.com/writing/what-comes-after-open-source) by Steve Klabnik

[28:15] **Mikeal:** But, yeah, a lot of the value stuff ... So the free-software community was values-driven. And in some ways, that community never had to deal with a lot of these problems that we're talking about because the values are baked into the onboarding. It's part of the set of things that you learn as you're adapting to it, right, whereas because open source is so integrated into commercial software and because it isn't values first, part of the onboarding into open source is not adopt these values, right?

[28:50] **Mikeal:** Most of the people that were doing them created institutions to perpetuate them. This is not very well-documented. But it really should be. Apache did the foundation. They started with obviously just Apache Web Server. And then they started to bring in other projects. And at some point, some companies had started to build businesses around open source, like Sun. And they were like, "If we put the Apache brand on their open-source project, it'll just be better, just make more money," right?

[29:22] **Mikeal:** And so Apache had to figure out a way to, one, not just be like a clearing house for branding things Apache, and, two, how do you integrate all of these new developers that had never done open source before? This is a very different time, right? So this project that is coming in to be what they eventually called the incubator and the whole Apache incubation process, a lot of the incubation process is not about the project but about the people. And you have this team of five people that made this project at a company. And they need to open up. They need to change how they work. They can't just do everything in an office together all the time. They need to communicate openly. They need to bring in more contributors.

[30:01] **Mikeal:** And so the incubator both provides the guard rails for that. You can't graduate out of it until you have more contributors. But it also serves as a training process for new open-source developers that were coming out of proprietary. And so the Apache values and the Apache way of doing things is embedded in those people and in that whole kind of generation of open source actually. It sort of fanned out from there.

[30:26] **Mikeal:** I think that people don't really ... Nowadays, people don't talk about the impact that Apache Foundation had because they literally just trained a couple thousand open-source developers, and those people, in turn, trained and adopted those values elsewhere. I think where things got really messy, though, is that they embedded their values in a process. And for a lot of people that learned the Apache way, they learned a process in a way of working without really internalizing the values that were the motivation to define that process.

[30:59] **Mikeal:** We tried to make this distinction when we created the Node Foundation's governance model where we have a way of doing things that is very mutable that we expect change over time that can change between different working groups. And then we have a set of values that went into that. And that's the thing that can't change. That's the thing that you have to sort of internalize and adopt, and then you can use that to make further process changes.

[31:20] **Henry:** Yeah. I guess that gets into the nature of how do we retain information and knowledge transfer across people and our culture through these processes. And I think about the podcast we did on Hope in Source about liturgy. In a religious way, you have those processes and traditions as well. And what do we have in open source that helps us to do that?

[31:48] **Mikeal:** Yeah. I mean it's really easy for people to copy a process. And it's a lot harder for them to internalize a value structure, right? It's just so much more work. And I think there's a place for ritual, right? Ritual is an interesting thing that you do and you don't know why you're doing it. But you don't have to know why you're doing it for it to be effective. That's the best, when I was learning [inaudible 00:32:17] meditation, that was one of the things the instructor said on the first day that really stuck with me is you don't have to believe in this for it to be effective.

[32:27] **Henry:** That's actually pretty interesting, yeah.

[32:28] **Mikeal:** You just do it. Yeah. And there's a bunch of things that I think fill that void in open source, right? I think conferences to some extent do that. There are people that go to FOSDEM every year, and they have a routine that they do and people that they see and places they go out to eat. And it's like going to Mecca, right?

[32:49] **Henry:** Yeah, yeah, no. Yeah, makes sense. [inaudible 00:32:51] but what you said, I guess it's really powerful that if you're involved in this ritual or tradition, it changes people. It affects how we live. But then you don't have to know how it works. But I think I guess it's on us, or maybe on the people that established those traditions to pass down why that was there in the first place. Otherwise, we forget, and I think it's almost maybe ... Even free software, all that stuff, I didn't know anything about that when I got involved in open source. And I didn't have to because we stopped caring about all those other concerns. We had new concerns.

[33:26] **Henry:** But then I guess knowing history it should be relevant to those things because we're just reinventing something again and not knowing what happened before.

[33:37] **Mikeal:** Yeah. So there's a book that I always recommend to people on this. And it's not the one that most people recommend about open source actually, because there's a lot of good books on open source on process and on values. But I feel like in the history telling of this, a lot of the underlying motivations and real values of free software get mistaken or mixed up in a lot of the ... How do I put this nicely? There's the antagonistic sort of attitude of a lot of the free software folks. And it's really hard to separate them.

[34:13] **Mikeal:** There's this book called [Hackers](https://en.wikipedia.org/wiki/Hackers:_Heroes_of_the_Computer_Revolution) by Steven Levy. And this book starts in the 1950s actually, in the Tech Model Railroad Club at MIT. And it basically traces this group of people into creating the AI lab at MIT, which is still very popular. And all of that work all the way through ... And you can just skip the third act ... So the first two acts are very relevant and really [inaudible 00:34:43]. And the third act is about the gaming industry [inaudible 00:34:47] Sierra and just has no relevance.

[34:49] **Mikeal:** But skip that and then move on to the ... Actually there's appendixes. And one of the appendices that he did in a further edition was called The Last Hacker, which is about Stallman before Stallman started the Free Software Foundation. And it was literally like he was the last person holding the torch of these values that started in the Tech Model Railroad Club about being creative and hacking things together and opening up access to other people and all of this kind of stuff.

[35:17] **Mikeal:** I mean there was a religious war against timeshare computing basically that inside of this AI lab because it restricted people's ability to fiddle with the system. And that's where all the creativity really comes from and where it lies. It's a really great book. One, he's a great writer. And, two, I think that's it's really relevant because these are the values that I still hold. Getting involved in this community really early on, this was a lot more prevalent, and also I was actually a security hacker really, really early on when I was young.

[35:55] **Mikeal:** But I remember just being completely motivated by, "I want to learn this thing, and I want to tweak it, and I want to change it." That was my motivation. And there's something really raw and human about it. There's a human instinct to want to learn things and want to manipulate them in order to understand them better. And that was a lot of the motivation that went into and even [inaudible 00:36:14] became open source because if it's not open source [inaudible 00:36:17] the software isn't free, you can't actually learn it and understand it and be able to tweak it. That's why the freedom to fork is the first freedom. That's why that is the most important thing. I need to be able to take this off and do something else with it and go my own way.

[36:34] **Mikeal:** And a lot of that gets lost in a lot of the sort of free versus open source and copyleft and all of that kind of stuff, which is much more about how do you enforce and perpetuate the values? Copyleft is important if you believe that there is no other incentive for people to open up the source of their software. And I think that there is still software that is built where there is no other incentive. We operate on the web and in cloud computing, and there is a lot of incentive, and in fact it's almost impossible to get developer adoption if you don't open-source things.

[37:10] **Mikeal:** But in other areas of computing, like a lot of embedded systems, for instance, there are strong incentives to not open-source things. And you actually do need licensing there to solve that problem. Yeah, I think that that community is unfortunately unwilling to admit other incentive structures, which has made it hard for them not only in this era where commercial software and open-source software are ostensibly the same thing, or almost the same thing. They're almost indistinguishable from each other. It's made it hard for them to adapt to that. But also I think that it's made it hard for them to have a place in this conversation that we're having about open source sustainability because it's about incentives that go far beyond what licensing can solve.

[37:57] **Mikeal:** Licensing cannot make me stop feeling like I owe it to someone to fix this bug request. There's no license that solves that. I mean all the licenses say there are no guarantees. It clearly isn't fixing this problem for me.

[38:16] **Henry:** Right. Yeah. I was listening to a podcast you did with Nadia on a16z, and that was like two years ago. And you were talking about production and consumption. And we're still talking about that, how ... In Steve's article, it was about how licenses only deal with the consumption side of limiting, I guess allowing access or not. And it has nothing to do with production, right? In a sense, I talked about this too, all the guilt that I have in open source is all self-imposed. It's all I feel bad. No one can make me do anything in a way, right? None of us are legally obligated to solve someone's bug or answer them on Twitter or anything.

[38:58] **Henry:** But culturally we feel like we should, or like we want to help people. But that has nothing to do with licenses, right?

[39:06] **Mikeal:** Right. It also doesn't have that much to do with money, right? If anything, money could make it worse.

[39:13] **Henry:** Yes. Yeah, it actually does make it worse. That is a real issue because there are people that will ... I mean I don't know how many people would want to say that publicly, but they could call you out, be like, "Well, I'm paying you, so why didn't you fix this for me?" kind of thing. I mean, yeah, they could be donating \$2, and they're like, "You have to fix this for me."

[39:31] **Henry:** And that's why people would rather not accept any money because people devalue your work. This gets into, why even have a Patreon in the first place? And now, the idea of having perks is not ... I don't know, I guess I don't like that idea anymore, at least for doing open source, because it just incentivizes you to have to do extra work that you weren't willing to do in the first place. And then you feel bad about it.

[39:58] **Henry:** So I'm already doing work. If they want to pay for it, they can. And they could choose not to. And so doesn't mean that once they pay, now it's an obligation. They turn the gift into a transaction, right? And it's supposed to be a gift.

[40:13] **Mikeal:** Yeah. That line is really, really hard, right? To some extent, Patreon is not really just patronage, right? It is not just gifts. If you have a podcast, you can do a patron-only podcast feed, and you can do art that is only for your patrons and things like that. So it does in some cases just operate as a paywall.

[40:35] **Henry:** Well, I guess yeah. And then they don't really have a lot of structure around that. You could do whatever you want. They're just a way to accept money from people and then it's established brand. So maybe they already have their credit card on there so it's easier for them to do it. But then it's up to you to decide all the tiers and stuff. And I look at people that are artists or on YouTube, they have tiers that are one, two, \$3, something, or more. And then, yeah, like what you said, they'll do a private podcast or your own piece of artwork if you pay a certain amount.

[41:12] **Henry:** And unless I already want to do it, I just don't see why I'm willing to do that for so little money. And that's why, yeah, you would rather just do it for free.

[41:22] **Mikeal:** And I probably don't say this ... I mean I've never said this publicly, but I don't trust developers as much as other people. I don't believe that putting every decision into the individual developer's hands is the best thing in the world. There's a long history of paying developers just to do open source or to do whatever open source that they want to do. And it has gone incredibly poorly.

[41:53] **Henry:** I've heard [inaudible 00:41:54].

[41:54] **Mikeal:** Yeah, yeah. I mean you don't want to flame individual people, so this stuff isn't public, right? But they've held projects hostage. They've taken a year off on something that nobody cared about. They end up listening to their community far less because there's just no incentive left. They're paid to do whatever anyway. I should say outright that I make a fair amount of money. I make enough money to be comfortable. I'm not independently wealthy. I haven't had an exit or anything. But I am paid well, and I do take jobs that will pay me well so that I can remain comfortable. I'm not trying to say that I'm sacrificing for particular work.

[42:33] **Mikeal:** But there's something to be said about the fact that if I was just off doing my own thing, I wouldn't know that anyone actually cared about it necessarily. I may not be doing the most valuable thing right now with my time, but at least it's valuable to someone who is willing to pay me this. That's a natural filter that I feel like you don't have when you get ... I mean some people at big companies are actually just hired to be the person that does that there.

[42:56] **Mikeal:** Yeah, I've had almost a job like that before where I was sort of paid to be me on behalf of somebody. But that was more going out to conferences and speaking and doing DevRel stuff, not actual development. And it doesn't align incentives very well. I mean I've had to try and fight against people in the past that are just paid no matter what they do to keep, stay on this project and tell me "no" and to tell their community "no" and to listen to nobody like they have that job they thought for life, and then Sun imploded, and now they don't have that job.

[43:40] **Mikeal:** But at the time, that was how things worked. And, yeah, I don't think that that's a great model. I don't have faith in that model the way that other people seem to have. I mean I don't have faith in general capitalism to figure out these problems either. But I don't have [inaudible 00:43:56] individual people.

[43:57] **Henry:** Well, I guess how does that relate to your point before about paying individuals versus projects?

[44:03] **Mikeal:** Yeah, I mean at least in that case, though, there is some compact between the people paying that person and them. [Evan's 00:44:11] a good example of this, right? Evan does Vue. And he'll go off on ... VuePress will happen, right? And so he wasn't working on Vue.js when VuePress happened. And a lot of people that are into Vue probably didn't really give a shit about VuePress. But he was confident that the people that give him money were going to be excited about something like that, right, and thought that was a worthwhile use of his time.

[44:38] **Mikeal:** If he was just working on a breaking release of Vue.js that would piss everybody off, he would expect to have a lot of patrons pull out, right? He is incentivized to at least not piss off his community, whereas ... And I'll just say when Guido was at Google just being paid to be Guido, he didn't really have an incentive to listen to people.

[45:03] **Henry:** Interesting, okay. So I guess the pressure in a way is ... because I feel this same thing where I'm like, "I'm getting paid now, so what am I supposed to do?" And I've become afraid to do what I want because I am afraid of what other people want me to do. And then it just becomes this spiral of anxiety where everything you do seems like it could be wrong. And that's true. Every release could be another ... you just have to fix all these bugs, blah, blah, all these things. And I'm like, what do I even want to do?

[45:35] **Henry:** And so even making the podcast, I thought it was great. But then all these people that know me through Babel, do they care about this other thing? Because the thing I actually care about is open source in general but obviously through Babel too. And I would hope that the people that are sponsoring me care about me for doing that, not just Babel, right?

[45:57] **Mikeal:** I don't know. I think that a lot of the things that I'm known for doing and a lot of the work that I've done it was really valuable to people. When I did it, it was really risky. It was not a sure thing. And you can really easily get trapped in this place when you're doing the same thing or maintaining the same project for long enough where you really don't want to take risks on the next thing or to a new thing, or what if I stop working on this? Then I won't have this opportunity anymore.

[46:24] **Mikeal:** And I don't know why I've been able to just hand things off and to stop caring and to move on to the next thing so easily. I think to some extent, I do get naturally bored doing the same thing long enough. But also I had some early wins handing things off.

[46:43] **Henry:** So you have experience with doing [crosstalk 00:46:48].

[46:48] **Mikeal:** Yeah, yeah. And seeing it work out really well, right, better than if I had continued to do it. I started the PouchDB project in 2010 and handed it off pretty soon actually. I think I renamed it to PouchDB. I started with a different [crosstalk 00:47:07]. And there was going to be a big rewrite, but I just wasn't finding the time, and handed it off. And then it got handed off again. And it just became a much better project because I had handed it off. It's way better. They adopted promises when I was saying promises are dumb. So that wouldn't have happened obviously. And that was a really good decision for them that I was dumb for trying to fight against.

[47:33] **Henry:** And that was the project that Nolan was behind, and then he wrote that post about open source.

[47:39] **Mikeal:** Right, right, right. I mean, yeah, Nolan did a much better job with it than I could've. Dale Harvey was running it before him and did a much better job than I would've. And so it worked out really well. And, yeah, I think that turning out so well has really encouraged me to not try to hold on to things. And I mean I worked on Node.js early on, but it wasn't like I owned a part of it, right, and was trying to hold on to that piece.

[48:04] **Mikeal:** I think the closest thing to this would be Request, right? Request, I wrote it really early. It's been around for almost 10 years now. I'm fairly I think tied to that project. And even that, we're shutting it down now, right? I'm not handing if off because I don't think that it should be handed off. I think the right thing to do is to slowly spin it down.

[48:22] **Henry:** Right. And that's a different decision anyways. I guess why did you decide to do that now after 10 years or whatever?

[48:30] **Mikeal:** So I should be honest and clear that I have tried to hand it off a few times. We've tried a couple different governance models that got other people involved. And different people have come in and done great work on the project. And I found out actually in the process of shutting it down that it was a lot of people's first or really early open-source work that they did and contribution. So that was really cool to find out, because they've gone on to do great things.

[48:53] **Mikeal:** So JavaScript is in a big transition right now, really big. And this has happened before. I think that if you look at jQuery, for instance, jQuery sort of took off at a time where the platform was very deficient. The web platform just didn't have enough there for you to build applications effectively. And so we started to build different frameworks on top of it. And Dojo got popular right before jQuery did. But eventually jQuery kind of won and was the toolchain that made the web much more usable, and eventually every site took it.

[49:27] **Mikeal:** And then the platform kind of caught up. And we didn't really need it anymore. And so people stopped depending on it directly. And new websites stopped taking it. It's obviously still on a huge portion of the internet. I think still by numbers, it is probably more adopted than any project ever. But I mean in the minds of younger new web developers, it's just not part of the stack that we accept anymore. And that's okay because it served its purpose, right? It filled the deficiency at the time, and it also encouraged the platform to catch up.

[50:02] **Mikeal:** I think that Node in the early days, we were painting over a ton of deficiencies in the language in the platform. I can't exaggerate this enough. Not only did we not have async generators; we didn't have generators. So when we developed streams for iterative data, we just had no [inaudible 00:50:20]. There was not a binary type. There was no binary type yet. The standards bodies were arguing about it. Ecma was trying to define one. And the WebGL folks were trying to define one. And it was unclear who would win. And it wasn't implemented yet in all browsers.

[50:37] **Mikeal:** So we created the buffer object. It was because there was no other choice, right? And the callback first error pattern is we are papering over deficiency in the language. Whenever you're literally creating an API for error handling and error propagation, you're papering over deficiency of the language. That is the job of the language is to throw errors. And so the platform has caught up in a big way. And I've been using these new parts of the platform enough now that I can kind of see how big of a change it is. How I use the language is different than how I used the language before. And a lot of decisions that are really low level in Request are not going to be able to catch up or change along with this change in the platform.

[51:27] **Mikeal:** So we could make a new version that was semi-compatible and was an easier upgrade path but use these new patterns but was never of those patterns, right, that was never fully embracing them because we have this legacy. But we'd probably get a ton of users just because it's Request, right? We already have this market share. But I don't think that that's the best thing for us and for the ecosystem. It would be better for people to take newer libraries that are on more modern patterns. And we have a weird unfair advantage because of how well-adopted Request already [crosstalk 00:52:02] yeah.

[52:03] **Henry:** Inertia.

[52:03] **Mikeal:** Yeah. And it's more than just the inertia, right? There's all the people that have already adopted it that are not going to change. But if you Google for how to do something with HTP in Node, you're going to get an example that has Request and Express. And even if we change our API a little bit, people are still going to find it because they were trying to do it because Stack Overflow told them to use it. They are not going to think, "I need a different HTP client. Let me search it in NPM or look for a blog post or something else."

[52:33] **Mikeal:** So the only way to really push people in a different direction to adopt newer, better libraries, and to incentivize an ecosystem of people to create better libraries, is to just deprecate Request, to just take it out of the pool. And so that's what we're doing. It's on maintenance mode for a while, and then I think we'll eventually fully deprecate it.

[52:50] **Henry:** Yeah. That's interesting that since the reason why it took so long was because JavaScript itself we were trying to figure out stuff [inaudible 00:52:58]. And I guess in some sense, even Babel was part of all that [inaudible 00:53:03].

[53:04] **Mikeal:** Yeah, I mean, so I think that it might seem like a big deal now that we're deprecating Request. But I think that in a few years, it will not seem like a big deal at all. I think that there's a big shift coming. So much of our toolchain is built to paper over these deficiencies in the platform. And now that the platform has caught up, we can greatly reduce the amount of conceptual overhead and tooling and just code between our code and the running environment.

[53:39] **Mikeal:** And I think that we'll see another kind of contraction similar to once stuff, like after jQuery basically. I think that we'll see another big contraction, and then we'll get rid of a lot of toolchains. And there will be really new tools that are much thinner that are just much smaller. And I don't even know where even something as big as NPM shakes out in that.

[53:59] **Henry:** Yeah, because I was going to ask about how do you know when you should just make a new name or deprecate. But then that seems impossible. I think maybe more interesting is more how do you send a clear message to the community on all this stuff? Because I think people might not ... Different words, like "maintenance" or "being deprecated" or "end of life" being something or "being dead," people have different definitions for all those things. And I think sending any message across for your open source project is hard because not everyone goes on GitHub. Not everyone's on Twitter. They might just have it somewhere, right?

[54:35] **Mikeal:** Mm-hmm (affirmative).

[54:36] **Henry:** It's hard to actually migrate people to anything, whether it's your next major version or a whole new project, right?

[54:43] **Mikeal:** Yeah. I mean for us, we can update the README, which does make it around, right, because that's on not just the GitHub project but also on NPM. And I think in a year, we'll probably start printing a warning that says that we're deprecated, or having a warning get printed in some way that says that this is deprecated, so at least when people run it, they'll see that, "Okay, yeah, we should probably figure out how to not use this library anymore."

[55:11] **Mikeal:** Yeah, and I think that a lot of people are suggesting alternatives right now, and then people are complaining about those alternatives and saying that they are not as feature-complete, or they don't have this or that. And my response is sort of, well, there's no incentive for them to write that while Request is the market share leader, right? Yeah. So I think that I'm hoping that the message actually just gets to the right people that are working on HTP clients or want to work on a new HTP client and that they go and do the work to bring it up.

[55:42] **Mikeal:** I think those are more important to me to get the message to right now than in the future that people should be switching.

[55:47] **Henry:** Right. And it makes sense that you would ... I mean it might be interesting to just talk to those people. And all those things that people were asking for is either those are actual feature requests, or then they can better understand what their project's about too.

[56:00] **Mikeal:** Yeah, yeah. I don't know. Things are changing.

[56:04] **Henry:** Everything's always changing in JS.

[56:05] **Mikeal:** That's true, but I do think that we've had a really big and long cyclical cycle of adding and sort of compacting all of our toolchains together. Our devchains have never been bigger. The number of tools that we have between writing code and running it in the browser has never been larger. And so it's just a much bigger sort of collapse to see all of that stuff potentially come down.

[56:33] **Mikeal:** When I look at something like Pika, it's like, okay, if I wrote an application this way, I would just not need all of what I've been building. It's a significant enough shift. And I don't think know that Pika is going to be the thing. But I think it'll be something that looks like Pika.

[56:53] **Henry:** Right. Or I guess you even see the progression of those kinds of tools where after we had Webpack and then Parcel and Pika, they're all adding or trying to [inaudible 00:57:02] all those things are all trying to combine all these tools together. Or we can wait for Sebastian's new thing that has [inaudible 00:57:10].

[57:11] **Mikeal:** I don't know. So one lesson that I learned in the early Node days is that being highly incompatible is its own advantage. You sort of have two paths that you can go down when you're creating a new thing, right? You can try to leverage everything that came before you and all of the work and adoption that people already have with these libraries and this large ecosystem. Or you can start from scratch. And the worst thing that you can do is actually be in between I think. And I'll get into that in a second.

[57:43] **Mikeal:** But in the early days of Node, we were the most incompatible platform that I had ever seen because not only ... So, one, it's a new platform, right? So we don't have Python Standard Lib or Ruby Standard Library or any of these ecosystems. We're new. But it's in JavaScript. Hey, people have written JavaScript. Well, it turns out that that there's no library that people have written in JavaScript that doesn't rely on [inaudible 00:58:07] in some way. So can't use any of that actually. That's all gone. When you look at when people build new platforms, they tend to write a C binding layer. And then a lot of what happens in the early ecosystem is people binding to the same C libraries [inaudible 00:58:21] for a long time.

[58:22] **Mikeal:** So Postgres adapters and MySQL adapters and a lot of that kind of stuff is usually just the same C code that people just [inaudible 00:58:30]. That's how Ruby and Python work, for instance. That's how Java works. It's all just the same underlying libraries. So we don't work with any of those. And you can't bind to them because they use blocking I/O under the hood. And you just can't block your node process forever in the C binding layer. So people have to write those from scratch. So Tim Caswell wrote a Postgres driver in pure JavaScript from scratch.

[58:54] **Mikeal:** And when we were creating this new ecosystem, all of these things that people thought were disadvantages that we were starting over were advantages because the internet is a really big place. And there's a lot of people that want to be the first person that writes that library.

[59:10] **Henry:** Yeah. I was noticing that too.

[59:11] **Mikeal:** One of the reasons why I was so incentivized to get so involved early on in the community was I could literally be the person who wrote the first HTP client. And TJ showed up to be the person who wrote the first web framework, right? And that's why Express is really big. And that's all of TJ's motivation. It was funny because people always make a really big deal out of when the early community people leave to go off and do a new thing. But what's so funny about it is, no, no, but they're going to keep doing that forever. That's what they want to do, right? Caswell went off and wrote Luvit, right? He wrote [inaudible 00:59:46] a whole new platform so that he could be the guy in the new platform.

[59:50] **Mikeal:** And TJ went to Go because Go was really undeveloped at the time.

[59:53] **Henry:** Right. Never thought of it that way.

[59:55] **Mikeal:** Yeah, yeah. It's really fun, first of all, to be involved in a community when it's that young and new. But it's also, a lot of people, like you were saying, people tend to think of developers as being either famous or anonymous. And if you're around just a little while, you realize, no, no, they're not really great. They were just there first. If you were there early, you have a lot more opportunities.

[01:00:23] **Mikeal:** And so a lot of people want to show up to be the first person to write that. And so my advice to Pika and a lot of the other systems where you could do a bunch of work to try to make all of NPM compatible or all this legacy libraries compatible. Or you could just say, "You know what, no, we're not. We're the new thing. You've got to make all new libraries. And we'll just start to capture all of the people that want to do that."

[01:00:47] **Mikeal:** And I think it's a much better model at the end of the day because you end up with an ecosystem that is really native. One of the problems that JVM languages have always had is that they have these really great ideas about what a new language, how the new language can work and how to implement it on the JVM. And then they get the early community people writing really cool libraries. And then people come along and just port all the Java. They just write new bindings to all the Java stuff.

[01:01:11] **Mikeal:** And so when you're in that language, you don't ever really get a fully native experience, right? You're always tracing some failure or error condition that actually goes into some Java code that somebody bound to. And, yeah, like I said, the internet is a very big place. There's a lot of people that want to be the first person to write something.

[01:01:30] **Henry:** It's funny because I was thinking about this in terms of just even Babel, an established project versus every time there's a new project that comes up, all these random people that just show up out of nowhere start becoming maintainers. And you're like, where were they before, right? It's like they were waiting to be those people. And so I almost feel like even if you are established project, if you want more contributors, you should just make a new project name.

[01:01:54] **Henry:** So Babel Preset-ENV, I made that a separate repo, and then that helped people get involved in it for some reason because it wasn't Babel, like Babel/Babel for some reason. I just realized I guess that's the case for languages and ecosystems even specific projects then.

[01:02:13] **Mikeal:** Mm-hmm (affirmative), yeah, yeah. Definitely. Yeah. It's a fun time. I don't know. I still like writing code. I keep writing code as a developer even though a lot of what I do for work now is people pulling other skill sets out of me. But I have cut out enough time to keep writing code because I really enjoy it. And, yeah, those new communities are always just so fun. They're such a good time.

[01:02:45] **Henry:** Yeah, I guess people are ... If it's something new, everyone's super incentivized to get involved versus all these other things that maybe it just feels like everything's maintenance and legacy stuff. And I feel like all people don't want to do that anyways.

[01:03:02] **Mikeal:** And so many people have preexisting relationships that you're sort of like ... I don't know. We don't talk about the people aspects of this enough. That was one thing that we were talking about a lot 10 years ago actually was the people part of open source and all of that. I do miss that a little bit. We were talking a lot more about just how to make nice spaces and stuff, I think because Rails became such a toxic place for a little while that a lot of us were talking about, "Okay, how do we do nice spaces for nice people, and how do we keep it nice?"

[01:03:35] **Mikeal:** And that was certainly what me and [Isaac 01:03:37] talked about a ton in the early Node days was just, "How do we make this not like that? How do we keep encouraging people to stay nice even as we grow?" And, yeah, I think that in those early days, it's just so easy to have those conversations and to meet new people and to build these relationships up. And when you jump into something many, many years later, it can be a lot harder.

[01:03:59] **Mikeal:** One thing that makes me really happy about the Node.js project is that we've just cycled leadership every couple years. And part of it is burnout. It's not all good. People do just burn out of that role because it's a really tough role to be in in leadership of the project. And there are more leaders in the project now too because it's so much bigger. But just having people cycle out is so nice because, one, it says to people that leadership is not a lifetime task that you've taken on. You can leave when you start to get too stressed out.

[01:04:32] **Mikeal:** And we've had a lot of people ... I've seen James Snell step up to something and then go, "I just want to write code now. I'm not doing that anymore," and go back to just [inaudible 01:04:39]. But it's also created a space where there's always new faces and new people showing up. And I've been out of the Node.js project directly for two years now, and when I see the core contributors, I don't know most of them. They're all new people. And that's really cool. I really like the dynamic that sets and the precedent that it sets for that community.

[01:05:00] **Henry:** Right. Because it's different to just say, "You can step out at any point." But seeing that actually happen, it's like, "Okay, I feel more comfortable actually doing that," or joining, I suppose, knowing that you're not going to have to maintain this thing forever.

[01:05:13] **Mikeal:** I mean I wrote Python for five years, and I tried to involve myself really deeply in that community and that project. And there was sort of an impenetrable barrier of people that had already been there so long that you couldn't really get their ear, and you couldn't really take on leadership at that time. That changed a bit a little bit later, especially around their foundation. And recently, Guido's actually stepping down, and new people are taking it on.

[01:05:37] **Mikeal:** So it definitely got better, but I remember at the time, it was just impossible to think about being involved in that the way that I've been involved in any project since.

[01:05:47] **Henry:** Yeah. I guess it's interesting to think about the procession people have on who actually works on a project and if you're able to be involved. I think it was a lot easier for me because ... Well, maybe in a way, I wasn't the first person to get involved, and Babel at that time was already really established. It was more that there weren't enough people. So I just happened to be there. And then when Sebastian burned out, I just happened to be one of the people that accidentally became [crosstalk 01:06:18].

[01:06:21] **Henry:** So when there aren't a lot of people and they leave, then you end up being the person.

[01:06:24] **Mikeal:** Yeah, yeah. I mean back to what you were saying about these famous, impenetrable people, it's like, no, we're just the people that stuck around, right?

[01:06:37] **Henry:** Yeah. Long enough until someone else shows up maybe.

[01:06:41] **Mikeal:** Yeah. So this is kind of a funny story, but when the IOJS fork was happening, which sort of led into modern Node and me kind of running the foundation, I sort of stepped into lead that effort and to pull everybody together. And the main reason that it was on me was that I was the only person that everyone would still talk to. So I've been involved with Node really early on and done a bunch of stuff in Core. And then I really pulled away from Core and started doing more community work and just NodeConf and everything else.

[01:07:12] **Mikeal:** And so as things got more toxic around Core, everyone got mad at each other. And I didn't start a company that was trying to financially benefit from Node, and I was not trying to get Code into Core. And so there were a bunch of Core developers that were all really unhappy. And they weren't speaking to each other. And so actually it might've looked from the outside like I showed up and I pushed everybody to start a fork. When I first heard about it, I heard that there was going to be a fork of Node. And I was like, "That sounds crazy. Let me talk to people about that."

[01:07:44] **Mikeal:** And then I dig into it, and I'm like, "No, there's not going to be a fork of Node. There's going to be three forks of Node, because three different groups of people are talking about forking Node. And they're not talking to each other." And so I literally stepped in, and I was like, "Okay, why don't we all talk about doing this together maybe." And then it was like, "Okay, well, maybe we can have [inaudible 01:08:05] let us take over the project." So we got everybody in a room together to try to talk to them.

[01:08:10] **Mikeal:** And by the end of that conversation, the accomplishment that we had was not that we convinced [inaudible 01:08:17] to do anything. It turned out that we ... They were not done messing with us. But the real win there was that everyone was on the same side other than [inaudible 01:08:27]. And we were all in it together, even companies that were literally suing each other.

[01:08:32] **Henry:** Right. But they didn't know that. They didn't realize that until you actually brought people together.

[01:08:37] **Mikeal:** Yeah. Well, and also just something happened in the room where everyone sort of aired their grievances, and it seemed like everybody was that they needed a different thing or they had [inaudible 01:08:45] perspective. And I was the person that said, "The problem is none of these things. The problem is that nobody in this room is allowed to fix them except for [inaudible 01:08:53]. That's the problem. There is no governance model here where we can take responsibility for any of this stuff. So it's not going to get fixed overnight, and we don't have a solution to every problem here. But we can't even begin fixing them until we actually have a stake in running this project."

[01:09:10] **Mikeal:** Yeah. And so that was what eventually, almost six months later, turned into the IOJS fork, and then [Joint 01:09:18] decided to start a foundation according to them that in no way related to that. Just happened to be the foundation that I had set up for them to start. And then so this foundation was started, and then we were able to merge the project in. And basically just our governance model became the governance model of the project.

[01:09:38] **Henry:** I guess just speaks to the importance of, I don't know, just communication and bringing people in a room. I feel like we don't do that. For people that communicate so much with code and on GitHub, I feel like there's a lack of whether video of hangouts or ... Even though people go to conferences, it's like, "I'll meet you at the conferences." Okay.

[01:10:00] **Mikeal:** Yeah, yeah. It was funny. People are asking me, when I was running the foundation, "What do you do? What is your daily ..." I'm just like, "I'm just on the phone all day." And they were like, "What?" And I was like, "Yeah. It's the least transparent thing that you could do, but actually my main job is to talk to people on the phone and do conflict resolution with them before anything blows up. And that is my main job." It's almost a mantra at the Linux Foundation is just call, JFC, just fucking call somebody. Just get on the phone with them.

[01:10:34] **Mikeal:** You'll just see when people are communicating in text, you don't have a lot of the subtext there. And it's really hard to unwind people's thinking. And you just get into the spiral wars getting more and more aggressive. And it's like stop. Just talk to each other now. Yeah, it was a fun time.

[01:10:54] **Henry:** I guess now I'm wondering in general is that the kind of thing that keeps you motivated to be doing this in this space?

[01:11:03] **Mikeal:** No, I hated that actually.

[01:11:06] **Henry:** Okay. That's funny.

[01:11:08] **Mikeal:** Yeah, I mean looking back on it, when IOJS was happening and I would say the first year that I was running the Node Foundation, it's one of the few times in my life where there was just nobody else that could do what I was doing at that time. And that's actually really rare. I'm not such a great programmer that nobody could take on my code or such a great manager or anything like that. There's really no other time where, no, no, if I don't do this, nope, this is not going to happen. It's just impossible.

[01:11:40] **Mikeal:** And then in the second year, it became much more of I'm just running this institution now. And to some extent, I need to just be fundraising for this institution. And that was what brought me to the decision to leave because if that's just what I'm doing, I think somebody else could probably do it better, and that would be better for the project. So that's sort of why I left.

[01:12:00] **Mikeal:** But no, I mean a lot of those conflicts would take a lot out of me. And, yeah, I'd have a lot of downtime. And I was taking on a lot of just side projects that I would write some code every once in a while. So, yeah, no, I mean I'm actually not ... Yeah, conflict does take quite a bit out of me. I don't think I would want to do that again permanently.

[01:12:22] **Mikeal:** As I've gotten older and just gotten more experience, you end up picking up a lot of skill sets other than just writing code. And wherever I've worked, there's always a pull of trying to lean on those other skill sets and get me to do things related to that, because this is such a high-growth industry that there just aren't a lot of people with a lot of experience. You get rarer and rarer the older that you get in the industry.

[01:12:48] **Mikeal:** Yeah, I mean I end up getting pulled in a lot of directions and on a lot of different stuff. And more recently, actually at my day job at Protocol Labs ... My day job. It's all of my time, but all of my time where I'm not raising my daughter. I've made it a point to wind down a bunch of stuff that I was doing and to not be looped into so many different threads of things and to really just focus on one team that I'm working with and having enough time to really think about it and put everything into it.

[01:13:19] **Mikeal:** And that's been really rewarding. One, it's given me a chance to actually be able to write code because there are things that need to be written that I am well-suited to write. And just managing a small team is really fun, having everybody in sync and building stuff together is a good time. And it's a thing that I can do that I've done in the past. I've managed teams and companies and stuff. And it doesn't feel like it's a lot of extra or something that I'm doing because they need it from me. It feels much more like, no, no, I'm doing this because it's actually enjoyable to work with these people, and it's nice to unlock a lot of their work as well.

[01:13:55] **Mikeal:** The happier the people are and the less that they have unreasonable expectations being set on them, the better work that they'll get done. So it's been nice.

[01:14:02] **Henry:** All right, just since you brought it up, I was curious, do you feel like there's any relationship between being a parent and doing open source?

[01:14:11] **Mikeal:** Well, I've been doing open source for 15 years, and I've been a parent for a year. So [inaudible 01:14:16] there's a direct [inaudible 01:14:18]. I think that when she gets older, there might be more skill set overlap. There will be more conflict resolution. There'll be more explaining. She's just a one-year-old right now. So if I'm explaining something to her, it's more for my benefit than for hers. I really want to know that I told her why she shouldn't grab that cord out of the wall. She's not really understanding.

[01:14:45] **Mikeal:** I mean having a kid definitely changes how you spend your time and how you think about things. For me, it's been just entirely positive. There's not a single negative thing that I can think of that's happened from it.

[01:14:55] **Henry:** Wow.

[01:14:56] **Mikeal:** Yeah. And I mean a lot of people will talk about, "The time, and da, da, da." And it hasn't really happened for me. So one thing to keep in mind is that my wife also has a really serious career that she takes very seriously. She went back to work in about four months after delivering. And so we have a nanny during the day while we both work. And then we completely share the parenting duties the rest of that time. It's really not ... In the first year, it's impossible to split it 50/50 because if she's breastfeeding, there's just things that only she can do. And so I'm just trying to do everything else.

[01:15:35] **Mikeal:** And now, it's less about that and more that sometimes the kid is just in a mommy mood. And there's nothing you can do. And, yeah, sorry, you are going to have to do this because she's not letting me do it. But, no, I mean, one, it's forced me to take a break every day away from my work and recharge. There was not a prompt to do that every day the way that there is now. And as I've gotten more attuned to that, I've been able to really enjoy the time with her and get a lot more out of it too. So that's been really, really great.

[01:16:12] **Mikeal:** I think that having a kid immediately makes you way better at time management. You just realize, no, no, all those extra hours of flex that I had in the day to do nothing or to handle my work, no, now I actually have to handle my work. So you think about all of the work that you're doing in a much clearer way. What I mean by that is as part of your job, you'll end up doing extra things outside of work, reading articles here and there, answering emails. You may think of your job as just writing code, but then much more of your time is actually spent on all these other things. And you never really sit back and catalog them until you either run out of time and burn out or if you just have less time.

[01:16:58] **Mikeal:** And so I've had less time, and so I've had to be much clearer about I can't take on this extra thing. It may sound like not a lot to you, but [inaudible 01:17:06] take me a lot of time to contextualize that and to keep on top of those conversations, I'm not going to take on that work item. So, yeah, that's been really I think important for me. When I look back on a lot of mistakes that I've made in my career, I think I can associate a lot of them with not managing my time and with not managing expectations very well, with just allowing a lot of things to pile up.

[01:17:28] **Mikeal:** And I even allowed that to happen when I started here. And then I've had to unwind it. But, yeah, so that's been really good. And I mean it's really, people don't talk enough about how good it is for you to have a kid, not just what you're putting into having a child, but in a lot of ways, it makes you think about how you grew up and experience a lot of that over again. And, yeah, it's wonderful. It definitely, it expands your emotional window, right? The highs and the lows get very different. I didn't realize that I could be that worried about something and also that I [inaudible 01:18:12] enjoy something that much. It's been really interesting.

[01:18:16] **Henry:** Right. Helps us appreciate our own parents and what [crosstalk 01:18:20].

[01:18:19] **Mikeal:** Yeah, yeah. Or I had an interesting thing where I definitely appreciate some of my parents, but also I had a pretty rough childhood, particularly around my stepfather. And I actually went through a period of time where I became an adult, and I was just like, "You know what, he was just a guy dealing with his own problems. Maybe it's fine," and kind of tried to forgive him about stuff. And then he hit on my sister at my dad's funeral. And then I was like [inaudible 01:18:44] no reason to forgive him for anything.

[01:18:47] **Mikeal:** But since having a kid, I've actually [inaudible 01:18:51] again, and oh, my God, he was horrible. He was so bad at this. All of this work that I'm putting into to try and make sure that my stuff is together so that I don't project it on my kid, just none of that happened, right? So on the one hand, with my mother and my father, I'm very appreciative of a lot of what they did in a new light. And then with my stepfather, a new level of criticism actually. But, yeah, that's a fun detour.

[01:19:21] **Henry:** Yeah. Thanks for joining me today.

[01:19:23] **Mikeal:** Yeah, yeah. This was a great time. It was fun.

[01:19:25] **Henry:** Yeah, I guess if you want to shout out what you're working on or how people can contact you.

[01:19:32] **Mikeal:** Sure. So I'm Mikeal, M-I-K-E-A-L, at pretty much everything. So my DMs are open on Twitter if you just want to send me a message there. And, yeah, I mean you can look at my GitHub at the same handle to see what I'm working on. A lot of what I'm working on right now is called IPLD. The GitHub org is called IPLD. And what it is is it's a bunch of new primitives and new data structures that are content addressed, so they're these Merkle trees, particular type of Merkle tree called dags. But essentially we're trying to build fundamental building blocks for data structures so that we can decentralize data.

[01:20:12] **Mikeal:** So the way that the web is decentralized and that you can link to everybody in a web page, we want to open that possibility up for data, so you can stop caring about where the data comes from and stop putting all of the data behind an API and just sort of bring all of that into the client and into the browser, share that data peer-to-peer, share it in different locations and edges and offline and all of that.

[01:20:33] **Mikeal:** So, yeah, that's mostly what I'm working on nowadays.

[01:20:35] **Henry:** Yeah. I didn't realize hashing is so powerful. I guess the idea that I guess it removes the [inaudible 01:20:42] because all you have to do is verify it's the same hash [crosstalk 01:20:45].

[01:20:44] **Mikeal:** Yeah, yeah. We talk about this a lot inside of Protocol Labs, but the longer that you sit with [inaudible 01:20:50] head, and you think in it, it takes years. But you just start to open up just completely new second-, third-, fourth-order things that happen from it. But a big thing is you don't have to trust the data source anymore, right? If I link to an [Earl 01:21:07], the thing that I trust about that Earl is the location of it. I know that I have to talk to authority to get that data. And then I'm getting the data that this person talked about.

[01:21:18] **Mikeal:** If you want to decentralize data, you need something that is not just their name somewhere. So a hash, you can get that data from anybody and then compute the hash, and you know that you got the data that you were talking about. So using a hash not just as a way to verify data but a way to address data really kind of changes the dynamic quite a bit.

[01:21:36] **Mikeal:** And one thing that really Juan Benet, who started Protocol Labs, opened my eyes about, and I think that he's really the first person to really put this out there that way, is to just broaden the scope of what is possible and how to think about those addressing. These are not addresses inside of a name space. These can actually just be global identifiers. I can take this content address and go on the other side of the internet and know no other context and look it up out of a network, whereas before we'd always thought about in ... Git uses Merkle trees internally. So there were hashes everywhere.

[01:22:09] **Mikeal:** That's why there are hashes in your commits is that that's the hash of head of the tree. But those hashes are only inside of that name space of that repository, right, and in the blockchain too. In blockchains, they use [inaudible 01:22:21] everywhere. But that's name space too within that blockchain. What we've done is created primitive so that those addresses can be much more global, that they can have a much more global context that you can know what to do with them based on the identifier.

[01:22:34] **Mikeal:** So there's a little bit more on the identifier than just the hash.

[01:22:37] **Henry:** Cool. Feel like we could keep talking, but we should probably end it.

[01:22:40] **Mikeal:** Yeah. Well, could always do it again.

[01:22:43] **Henry:** Thanks for listening. Check out our website MaintainersAnonymous.com for show notes and transcripts. If you have any feedback, ideas, or guest suggestions, you can reach me on Twitter at left_pad. If you'd like to support the show, you can visit Patreon.com/HenryZhu.
