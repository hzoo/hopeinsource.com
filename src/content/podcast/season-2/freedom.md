---
title: "Funding One's Freedom (Evan You)"
season: 2
date: 2019-05-06
time: "86"
description: "How can we be free? Evan You (Vue.js) chats with Henry about the complexities of funding people vs. projects, non-monetary perks of oss, Patreon potentially just a payment processor, the honing in on the uniqueness of open source (being free, flexible, organic/emergent, self-motivated, distributed/remote), full time not being for everyone, the importance of side projects and off-pressure moments and just having fun."
episodeLink: https://anchor.fm/s/ff707650/podcast/play/96461807/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-11-31%2F392345742-44100-2-496c601fb9ec569c.mp3
embedUrl: https://podcasters.spotify.com/pod/show/hopeinsource/episodes/MA-5-Evan-You-on-Funding-Ones-Freedom-e2su9hf
sidebar:
    order: 5
---

### Transcript

> Conversations may be edited for clarity. [(edit)](https://github.com/hzoo/hopeinsource.com/blob/main/src/content/podcast/season-2/freedom.md)

[00:00] **Henry:** Today I have with me, Evan You. He's the creator of Vue.js. He has been working full-time for about three years, and I thought it'd be great to have him on since we tend to... I guess we tend to come up a lot when people are talking about open source.

[00:21] **Henry:** And it's funny, my first time meeting Evan, it was funny because I remember I went to JSConf Last Call, and it was the first conference I've ever been to. And then he randomly come out to me, like, "Henry?" I was like, "What?" And then he's like, "Any effects just like, Babel, runtime, bug with like version six or something?" I was like, "What are you talking about?" I just thought that was funny. That's the first thing that we interacted on.

[00:49] **Henry:** But yeah, I think-

[00:50] **Evan:** I also remember going to that one. I think I was still working at Meteor. And very few people actually knew about Vue I think. Some people actually know about it, but it was like nowhere as commonly known as today. I was thinking, "Maybe one day, I would do a talk about Vue at a conference like this." That was literally the thought I had when I went to that conference, and a lot of people that I really looked up to.

[01:21] **Henry:** And now you have conferences about Vue all the time.

[01:24] **Evan:** Yeah. That's kind of crazy, actually.

[01:26] **Henry:** Yeah, I guess, it's kind of interesting to see the growth of a project, not just like... because I feel like when open source projects get big, a lot of libraries get created or components, but then it's also like all these other random things. It was like a newsletter, and a podcast, and meetups and conferences, and people would make video courses. And I think that shows a lot more of how it's growing more than just the fact that people have more downloads.

[01:52] **Henry:** For me, it kind of it's interesting, because I feel like a lot of it has to do with to proceed value of the project versus just the project itself. And I see this with Babel. It's like, if no one's talking about it, and everyone's using it, it doesn't really matter to help us fund it.

[02:09] **Evan:** Yeah, that's true.

[02:10] **Henry:** But then stuff like, "Oh, X percent of people on MPM are using this." And it's almost like even if it was wrong, or the way they got that number was wrong, people are still going to believe that and it actually convinces people to use it. And so it's like, I have to go out of my way to tell people that people are donating or using it. And I think that's kind of weird.

[02:31] **Evan:** Yeah. One thing I've noticed the difference between projects like Babel and projects like Vue is different types of projects have different sort of, I guess, exposure channels. Because frameworks, front end frameworks, like Vue, React, Angular, developers tend to interact with these APIs on a daily basis. They kind of keep getting reminded that they're using this framework, and they have to look for questions, answers, documentation, and all the stuff. I guess the frequency that they interact with the project is just much higher compared to a more infrastructure level project like Babel, where in most projects you set up... maybe the project lead set it up once, when the project was started. And most developers don't even care about it when they use it, right? Unless they run into a bug or something.

[03:34] **Henry:** Right. It's like all negative.

[03:35] **Evan:** Yeah, right? It's a thing I've noticed over time, and it seems like... because that's why I seem to have a relatively easier time, just getting people to donate or just like know about you. To be honest, I didn't really spend so much time going out there telling people about how much people are using it. I guess it's an advantage of something being so close to the developers on a daily basis.

[04:04] **Henry:** Yeah. And I guess you also have stuff like Chrome extension and people telling everyone like, "Oh, this website's using Vue." No one's ever like, "Oh, this website's using Babel? No one ever say that.

[04:18] **Evan:** That's true. Interesting. Yeah. And the percentage is probably much higher, right?

[04:23] **Henry:** Yeah. And this [inaudible 00:04:24] is fine like all of them, because... it's funny, I was looking at say, Next.js or Nuxt or anything, every website that's using Next.js is technically using Babel.

[04:36] **Evan:** That's true.

[04:37] **Henry:** And so every time like Guillermo tweets, he's like, "Okay, I guess another website's using Babel." But no one's doing that, and no one's excited that that's happening.

[04:46] **Evan:** Mm-hmm (affirmative).

[04:47] **Henry:** It's kind of funny.

[04:49] **Evan:** Right. And also, I guess, it's hard to have an accurate statistics about that.

[04:57] **Henry:** Right.

[04:59] **Evan:** Technically, we can maybe write a Chrome extension that checks whether the source code contains some Babel specifics like [crosstalk 00:05:07] or helpers. But having people agree to install that would be a really hard thing to do.

[05:13] **Henry:** Actually, that would be interesting. Because we could figure out if... Well, we would have to ask all the extensions to add that in there. But that would be interesting to figure that out. Because it would just be another FCheck on some random artifact that Babel has, right/

[05:30] **Evan:** Alternatively, maybe you can work with... I think there's a website called BuiltWith, which kind of crawls websites for technologies they use. If you can maybe get in touch with them and figure out a relatively accurate way of determining whether a website uses Babel. They can definitely leverage their crawlers to just do this. Just add Babel to one of the things they collect information about.

[06:00] **Henry:** Yeah, I guess, because we mentioned funding, I guess one of the questions that... I listened to some old podcasts that you've done, and I've done, even back from like RFC, like 2017, I think one of the questions that people have had, at the time is like, "Should companies and people fund projects or fund the people directly?" I guess it's similar to the whole Patreon versus Open Collective. And funny because both Babel and Vue have both of them.

[06:33] **Evan:** I think that's a really interesting question, to be honest, I don't even have a very good answer. Because I think it really depends on how the project is organized. Like for Vue, the issue is the definition of the Vue team is not like a commercial entity, where the money goes into the entity, and then there is a predetermined way of redistributing it among the team.

[07:06] **Evan:** For team like Vue, because there is no fixed responsibility, most of our members are volunteers. They come join the projects, sometimes they work on a thing very passionately for a period of time, but we don't say you have to keep doing it that way. If they feel like they have to attend to other things in their life and just want to stop working on Vue, that's totally fine. We don't try to assert any sort of obligations on our team members.

[07:39] **Evan:** It's kind of a double edged sword, because on the one hand, people don't have to always feel the pressure of like, "I have to... like putting this amount of work to be able to consider doing valuable contribution to the project," because we don't have that kind of requirements. But on the other hand, it also makes it harder for us to gauge when it comes to financial returns. Because a lot of the work people do it's really really hard to quantify.

[08:17] **Evan:** I don't feel it's fair to just count the hours. And also some of the some of the stuff people do is really hard to quantify, like just interacting with the community, answering questions, all of these things are helping the project. It's just really hard to figure out a proper way to, I guess, math these contributions to how much money they should get in return. And also like, it creates a really awkward dynamics when you try to openly talk about it inside the team. Because if you try to reward some team members for their work with money, then there comes the question like, "What is the criteria for receiving monetary return for your work on a project?"

[09:10] **Evan:** We do have a few members like Young. He's doing so much. And we actually frequently let him expense his work on Open Collective, but in general, we find it pretty hard to have a set of rules on like, "How do you quantify the amount of work you do, in terms of how much money you get?"

[09:38] **Evan:** In the end, a lot of our team members started their own Patreon, which actually, some of them are doing pretty well, I think. Like Young has over 1400 a month from his Patreon, plus the amounts that we regularly expense on Open Collective.

[09:56] **Evan:** Chris also has over 900 promote on Patreon for the work he does on the docks. So in that way, I feel like it makes them more motivated in some way. I'm not sure, honestly, I'm not sure if it's the best way. It's just we honestly feel it's a hard problem to tackle, so we ended up letting the team members do their own Patreon. I think it's highly coupled to how the team is organized. If you sort of run the team as a very disciplined, like entity, where everybody has a fixed responsibility, and everybody has to do weekly reports, lay out their roadmap, the work they plan to do, then, it makes much more sense to say, "If you do this work, this is the amount of financial reward you get." But on the other hand, being super, super flexible, also creates some sort of a difficulty in designing a system for distributing financial rewards. I guess it's a challenge. We're still figuring out ourselves.

[11:13] **Henry:** Yeah. There's a lot to unpack there. I asked this, because we have the exact same problem, and we're dealing with the same thing. And I think, even though it's true, open source is so many different things, but I feel like for the kind of open source that we're involved in, like this community type of open source, it's the same thing. Most people don't have a fixed responsibility, and people kind of just come in and out. And we shouldn't, like you said, we're not going to force anyone to do anything.

[11:44] **Henry:** And so, what you were saying, "How can you reasonably figure out a way to pay people when people live in different places, people are in different stages of life, different kinds of work," that you say, like triaging issues versus like features or docs? Honestly, it's literally... I don't think there's a way to fairly do that.

[12:07] **Henry:** And then also, it gets into, well, it's because there might not even be a long line in the first place, and then it gets even weirder, because then you can't be like, "Oh, we're just going to pay everyone the same amount." And it's like, well, they're just going to run out. And so I feel like maybe that's why a lot of us have decided it's more like... Well, I didn't say it from my case, I quit to do this full-time. So I think no one would be mad of giving most of the money to the full-time people versus just splitting it up. It almost feels like it's better to use, or give the most of the money to the same people versus spreading out to multiple because that won't be effective. Right?

[12:44] **Evan:** Yeah. And also, I guess, similar to how startup founders... I mean, in practice, startup founders reap the most rewards. But it's also because they take the most risk. But you have a full-time job back on, you don't have a strong reliance on the open source work as your income, as your means of living. Say, when you decide to quit my or when I decide to quit, we're taking really big leap of faith, hoping that this thing would work out, would actually be able to sustain our living by doing this work.

[13:31] **Evan:** You kind of have to be able to have enough money to actually make a living, if you take the risk to do it full-time. That's why if someone is actually doing it full-time, it makes it much easier to justify giving them money versus, if you're just doing it on the side. For example, I know some people, they actually just do it as a hobby kind of thing, versus someone who works on it as a means of living. I think that's a different mindset. So their expectations for the financial return is also kind of different. So, I guess, there's just a lot of factors involved here, when it comes to what people expect and what they actually get.

[14:16] **Henry:** Yeah. I guess honestly, the answer is more than that. It's just complicated.

[14:22] **Henry:** And thinking of that, it's like Logan, he's a core maintainer. I was asking him if he wanted to do a full-time, and he ultimately decided to go back to working. And he took a job at Mozilla to work on the Firefox dev tools. And he said that even though he's a core part of the team, he would rather do it as a hobby, because he didn't want to deal with that whole, what we're dealing with, I guess. And I think it's better for him if that's what he wants.

[14:51] **Henry:** It's almost like we shouldn't make it seem like everyone should do it full-time because it looks like it's amazing. Just like convincing everyone to do open source in general. I think people should know what they're getting into. And I feel like a lot of times, we don't really talk about it.

[15:06] **Evan:** Totally. Yeah. It's like a career choice. Some jobs, you would just enjoy, some jobs, it's just not for you. Open source is definitely not for everyone.

[15:19] **Henry:** Yeah. And I would say, not because no one's not technical enough, but the sense that the people stuff, maybe you just don't want to deal with community.

[15:28] **Evan:** Totally, the things you have to deal with. I guess the pressure of working for yourself and also, whether you actually enjoy dealing with it enough to do it on a daily basis is definitely a big part of it.

[15:44] **Henry:** I just talked to Michael Rogers on the previous episode, and he actually mentioned how... I was talking about how one thing I see is that I don't tend to talk to a lot of different groups of people that are in open source. So like, I'm in my line, we're all in this JavaScript bubble. And I don't know a lot of people unlike Ruby or Python. And he was saying that it seems or his observation was that in terms of sustainability, even that people follow the leader.

[16:13] **Henry:** And so it was interesting that since you made a Patreon, it seems kind of obvious that a lot of other people that want to work on Vue that want to do a full-time or part-time, they made a Patreon. But then it might not be the case in other communities. I thought that was interesting, too.

[16:30] **Evan:** Yeah, I honestly don't know that much outside of JavaScript world, to be honest. A closest person I know is Taylor, Taylor Otwell, he works on Laravel, he also runs a full-time. But he has a much more commercial oriented mind. So he kind of builds a lot of products around it. And is very very successful in that aspect. He's just a really productive person, I guess. I don't know how he manages a framework, at the same time cranks out so many commercial products at the same time. I just don't think I can do that. But if you are as productive as him, it's definitely a cool path to walk on. Because it's more like you are working on open source, but you're not completely reliant on it, because you have something that actually generates proper commercial income.

[17:29] **Henry:** Right. And I guess for that, that is a good business model in the sense where it's more like open source is your way to reach people. And then building something on top. Or similarly I guess like open-core and all that. I guess we've chosen this funnel. Well, I guess my question is, where do you see the future of how to grow your own funding or the team in general?

[17:50] **Evan:** Yeah. So for us, I don't know if I've mentioned this to you before, but we currently... I just hired one full-time developer. He's based in China right now. So he works on our CRI, most of the time, at the moment. So he's technically our first full-time member beyond me. So we have-

[18:19] **Henry:** That's awesome.

[18:19] **Evan:** ... Yeah. So technically, we have two full-time people working on it now. I do hope we can expand the headcount a bit more in the future. But I also don't want to turn this into a startup where we have to account for investors, look for growth and all that stuff, because we really want to do this more like, I guess a lifestyle entrepreneurship type of thing, where we want to make sure we enjoy working on this thing, we make enough money to make a living. And yeah, that's pretty much like where I see what I would want to move towards.

[18:58] **Evan:** And in order to do that, I think eventually, we might have to figure out some sort of way to tie into some commercial offerings. But I'm not entirely sure how we're going to approach that because, I personally am not too fond of something like running a company or having to nurture people, so it's still something we're trying to figure out.

[19:23] **Evan:** I really like the status am in right now, where I can mostly just focus on the project itself, and not too much on the commercial side of things.

[19:34] **Henry:** Yeah. I feel like the same way. Like, I don't want... When you raise money for VCs, you're going to have to earn it back. And then, the point is growth, which is just, "What are you going to spend your money on if you raise that millions of dollars, is to hire people." And the whole point of open source is that you don't have to have that many people working on it, and everyone can use it. And so I almost feel like, because it's already working so well, it's not like you need to hire 100 people to make it work, it's just going to make it work, right?

[20:04] **Evan:** Yeah. Taking investments, eventually means there has to be a business model around what you're working on. And the thing is, not necessarily every open source project has a good business model for it, right?

[20:21] **Henry:** Yeah.

[20:22] **Evan:** So that's the interesting part. It's like open source projects, these projects, we've built something people want. A lot of people use the things we built. But how does that convert into value and how do you collect that value? That's the question of what kind of business model you can build around it.

[20:45] **Evan:** But the thing is the way open source works today, especially for a project like Babel, it's really hard to envision what kind of business model you can have for it. If you build a database, it's straightforward. If you build something you can sell, it's straightforward. But for projects like Babel, especially for something that people already have kind of taken for granted, it becomes even harder.

[21:10] **Henry:** Like I said, the fact that it's so successful, makes it even harder, because they're already using it to the fullest extent.

[21:19] **Henry:** I had ideas on like, "Well, if you want new features to show up early, whether it's like... " I almost feel like TC 39, the companies on there should be funding the development of new proposals. So when someone is a champion, they propose something to the committee, where's it's at stage zero, one or two, they should pay somebody. It doesn't even have to be us, the Core team, somebody should be paid to actually write the code to make it happen.

[21:46] **Henry:** And there's so many things related to that. It's like, what if you paid someone to go through the whole process, like the two year process of getting something into stage four? Making sure that they write the tests. And what if someone... all these comes down to if you're using it, you could write the migration code, like code mods, the documentation, and examples. There's so many things. It's like, we're just waiting on some random person to implement it.

[22:13] **Henry:** In the case of decorators, Niccolo, one of our core members, he just randomly decided to do it. And it's like, "Are we really going to wait for some person just to do it, just because we want decorators, even though everyone wants it." It seems kind of absurd.

[22:26] **Evan:** Actually, when it comes to that, instead of having... thinking in the way where, someone should pay someone to do it. Another way to think about this is some big companies should allocate one of their full-time employees to spend time following this through as part of their extra job.

[22:46] **Evan:** Which is kind of what happens for a lot of projects like Chromium or something like that. It's open source, but a lot of Google employees actually work on it full-time as part of their job.

[23:00] **Henry:** Right.

[23:01] **Evan:** So, ideally, if we can have companies that spend time, allow maybe one of their employees to allocate part of the time following this through a specific proposal as inside of Babel project, I think that would be really cool.

[23:20] **Evan:** We have people on TC39 championing these proposals, and most of them are also employees of some company. So it kind of makes sense to apply the same kind of model for Babel, where if we want to have a... we have a corresponding proposal with TC39, and we have the corresponding implementation, and all the documentation stuff in Babel, so we can have then someone from the same company work on the Babel side to sort of complement the proposal side in TC39. I think that would be really awesome.

[23:54] **Henry:** I guess, we've seen this recently, just like the last few months. Bloomberg has been contributing to all the private methods stuff. And some other companies have been stepping up. It's just it's kind of a slow thing, where it's almost like people don't know they can do that.

[24:10] **Henry:** I almost feel like everyone using it, they know we're a community driven project, but then people almost feel scared to ask if they can work on it, which is weird.

[24:22] **Evan:** Yeah. I guess there's two sides of this. There's one side where people feel like, "Maybe someone has already decided to work on this. Like, would it be... " Maybe some people just feel out of place to just step up and say, "I'm going to work on this."

[24:36] **Evan:** The other side is, inside of companies, who are the key persons that we need to... someone needs to be convinced to say, "Okay, you are going to spend this time working on this Babel thing." I just think in general, the industry doesn't have a mindset for this, because this is not a common theme, where people probably don't even know there's this possibility. If we can somehow... if we just make a case study for it, like Bloomberg contributed to this project field thing, and it has been working really well for them. They're getting proper recognition. They get to actually get this into production sooner for their needs. So this would be a really good story, and more companies will follow suit.

[25:35] **Henry:** We mentioned all this in our blog post, but maybe we should do a better job of... It's only good marketing for them in terms of just goodwill in the community, but also literally getting what they wanted in the first place. And so yeah, how do we... what you said, make a story about that?

[25:54] **Henry:** I think that's really important. I most feel that's all the non technical stuff that people might not be thinking about.

[26:01] **Evan:** Definitely.

[26:02] **Henry:** We're not changing gears, but since we're talking about funding still, when people are funding you on Patreon, what do you say that is for and then what do you think people believe they're funding you for? Is there a difference?

[26:17] **Evan:** In reality, we have two types of donors on Patreon. We have companies and we have individuals, I think most of the individuals are really just donating because they use Vue, and they think we are doing a decent job, and they want to see us keep doing that. I think individual donors are mostly out of their mindset. And I think that's really great, because it's exactly what they think they're donating for and exactly what we're using it for.

[26:51] **Evan:** The companies, the incentive, and the outcome might be... there might be a little bit of a mismatch, but I think they ultimately aligned. So most companies to be honest, they become a sponsor on Patreon, because they want to see their logo on our website. But if you think about it, the reason they want to see their logos on our website is because we have a lot of traffic, we have a lot of developers visiting our sites. And the reason we have a lot of developers is because we are working on Vue, trying to make it better. If we don't do a good job, we don't have visitors, then this sort of sponsor value kind of evaporates.

[27:34] **Evan:** So, if you think about it, it's almost like athletes or sports teams. When they play games, they don't actually create direct value for anyone, but because so many fans are passionate about it, so many fans are watching the games, these companies, they're willing to sponsor these athletes, just to get their brands out there. I think this has proven to be a valid model for funding. I think that, it's been working decently well for us so far.

[28:08] **Evan:** The funny thing is, I've actually been spending a bit of time this year to sort of automate this process even more, so that, when a new sponsor come in, they would receive an automated email message, which asked them to fill out some forms and upload their logo. And that would trigger a belt script to send an automated PR to the website, which makes the whole thing just automated.

[28:34] **Evan:** I've actually been annoyed by this for quite some time, because every time a new sponsor comes in, I have to ask them for the logo, sometimes I have to manually update the site or stuff.

[28:45] **Henry:** Yeah, I have to do that exact same thing.

[28:47] **Evan:** Right? So, since I've implemented automated system, it's been saving me quite a lot of time. I think the most important part is to sort of... it just feels good to be able to stop worrying about these chores and to be able to focus on things that you think matters more. Not saying that sponsors don't matter, but the grunt work of just collecting this information putting it on the website and manually updating stuff, it's just... if these can be automated, then-

[29:24] **Henry:** We should.

[29:25] **Evan:** ... Right.

[29:25] **Henry:** Yeah. We're programmers. That's funny that you've mentioned about brands. It's almost like the project itself is the brand, and even though in a way the companies have a bigger brand in general than the project, but because they're the ones trying to be on our website, we're the brand.

[29:44] **Evan:** Yeah. I think we are a channel where... because we have an audience. So the audience becomes potential customers for these companies that are sponsoring us. You see, there are some typical types of company that will sponsor open source projects, they either build developer facing products, or they offer educational content, or things that typical technical startups would be interested in.

[30:20] **Henry:** Yeah. I guess I was wondering, "What kind of companies are the people on, are doing this?"

[30:26] **Evan:** Yeah. I think mostly any product that a technical company would be interested in, they would be interested in having. And the thing is, because as open source projects, our audience has a very, very targeted demography. It's like the sponsors know if someone visits Vue.js website, it has to be a developer or someone who's involved in a technical organization. So from a marketing perspective, it seems that a lot of headache of just... It's much better than saying, "Buying just Google AdWords."

[31:04] **Henry:** And this is kind of specific now, but I've also thought about in a way, anyone can put their company logo on there. And so, have you had to ever think about saying no, basically, because...

[31:20] **Evan:** So far? Not really, I guess. So far, most of the websites we see, most of the sponsors we see are indeed related to a tech audience. So as long as it's appropriate for a tech oriented audience, I think that will be fun.

[31:41] **Evan:** There are a few times where... it's funny enough, because I've received some emails, weird emails saying, "Hey, we want to advertise on your site?" Maybe they're just scraping websites with high traffic or something. But I don't... I see that their company, there's nothing related to technical world at all, then I would not really reply or be interested in working with them.

[32:16] **Henry:** Yeah, because I had the same problem, where it's like... you don't want to just take money because they're giving you money.

[32:23] **Evan:** Yeah, definitely. There has to be relevance to some extent.

[32:26] **Henry:** And I guess that's the same with if you have a Patreon... I was talking about this earlier with Michael about people have all these tiers and they're supposed to be ways for you to give more, it's like, "I don't really want to do more work, just to make more extra few dollars or something like that."

[32:45] **Evan:** Yeah. I think one of the important things I... When I start the Patreon, I have... from day one, I had the intention to make sure that... Like, if you look at other patrons, like video content creators, they typically tie the tiers to what the donor gets back. Like, if you donate more, you would get back more actual stuff that the creator produces. Whereas for us, our usage to Patreon is just more like a payment processor. Because our tears are not directly related to how much they get from us. It's related to how much exposure they get on our website, which is a passive resource for us. And I think that's a good thing, because we are able to decouple the amount of sponsorship that we get from the work. Not saying that we can just not do any work, but we are able to take more control of what we want to work on, which allows us to focus better on the things that matters for the project, instead of for the sponsors.

[34:05] **Henry:** I completely agree. It's like, otherwise you can't scale what you're able to do, because... If it's like, "Oh, I'm going to make an extra video for every person that gives me X dollars." Not going to work at all.

[34:17] **Evan:** I feel like to some extent, we do occasionally we have some big sponsors, they have small requests, but nothing like, "We would just implement this feature for you," or, "We would just merge this PR because you're a sponsor." We don't do anything like that. Most of the time, it's like, "Oh, we have this thing going on? Would you be kind enough to return it for us?" We'd be like, "Okay, sure." But other than that, it's mostly, sponsor is just a sponsor, it's not a customer where you have to answer to their specific needs or anything.

[34:52] **Henry:** Right. And maybe if you want to go that route, you would just charge a lot more than whatever this is.

[34:57] **Evan:** Definitely.

[34:59] **Henry:** And since you mentioned that Patreon is just a payment processor, at that point, it makes me think that in a way, developers in general don't really care about Patreon, for what it gives me. It's like, if someone else made something like this, say, even GitHub, which makes a lot more sense, I would just see everyone just switching it up. Because all the developers are already on GitHub, it makes more sense to be on there. And Patreon doesn't care about open source developers, it's just one other section for them.

[35:30] **Evan:** I think Patreon is, it's taking a decent cut out of the money we get. I've actually thought about building something like this myself. But ultimately, Patreon is still creating value, because think about the amount of energy and time I have to spend to build this myself and have to keep maintaining it. Patreon does have a lot of utility contained in it, because you can... it has sort of serves as a CRM, to some extent, customer relationship management, you can refund people if they somehow mess up the payment with just a few clicks of buttons, instead of having to wrangle with credit card companies yourself. So they do provide value.

[36:20] **Evan:** In that sense, not saying that Patreon is not a good platform, it does serve its purpose, even in the open source case, but if there is something that ties more directly into open source, it would be great.

[36:36] **Evan:** Open Collective is also pretty great. We now have a decent amount of pledges on Open Collective as well, which we use to fund like [inaudible 00:36:46], like out Soda's work. Soda is our team member, full-time employee that I mentioned, that works our CRI, so most of the income is funded through Open Collective now, which is pretty awesome. And I think Linux Foundation is building something really similar to Open collective.

[37:10] **Henry:** Yeah, I was just kind of like, "Why."

[37:12] **Evan:** Yeah. It's great to see there are more solutions in the space, though. This is definitely something that sustainable open source needs, if we want to enable more people to take this route. It's always good to see more people trying to provide good solutions in this area.

[37:35] **Henry:** I agree. And even for our project, Open Collective is exactly how I make my living, because Patreon doesn't have a lot for me. And I don't know exactly why that is. And there's a lot I could speculate that maybe it was because we made the Open Collective first, stuff like that.

[37:54] **Henry:** But where do you think that these services could improve on? I guess, is there anything you feel like they could do better? Or you probably don't really think about it that much?

[38:03] **Evan:** Not really that much. One of the things is, I guess they should expose a better API for us to automate a lot of the workflows. Like, contacting our sponsors, collecting information and querying most up to date list of sponsors. This kind of API.

[38:28] **Evan:** When I was building my automated solution for Patreon, I really had a hard time because Patreon's API, to be honest, is pretty bad. There isn't even a standard way to just download a list of the sponsors. I had to actually do a pretty hacky way to just get all the list. So, I just wish there would be a... some of these services were just built with developers in mind, you should give them the tools they want to fully automate their workflow.

[39:07] **Henry:** Makes sense. And it's like, more likely that Open Collective would do that than Patreon.

[39:13] **Evan:** Yeah. Open Collective have this automated logo thing, which is pretty smart. You just copy paste a bunch of images with like zero to 10, and they would update the list. I think it went buggy for a while, I still think it's pretty smart idea. Whereas for Patreon, I actually have to build this whole thing myself so that I could generate automated pull requests, which took a lot of time, but I'm glad it's working now.

[39:43] **Henry:** Yeah, we use that for everything too.

[39:45] **Henry:** I want to move on to talk about more governance, rather than funding. My observation is that open source is pretty organic, and that people can just step out to just work on stuff that they're interested in. And the way leaders come about isn't because you told someone, "You should do this", but everyone just kind of self appoints in a way.

[40:06] **Henry:** And so, in that sense, it gets kind of hard to do coordination. So I'm just wondering, how a team... how do you make sure that everyone's on the same page? You can't obviously know everything that's going on, and so you have to delegate and you have to play those meetings and all that, but how do you actually do that if everything's acing?

[40:27] **Evan:** Honestly, I don't really have a very structured answer to that. I guess, a lot of time it's just improvisation. Sometimes I would just write a roadmap of what we plan to do. But a lot of cases, one of the things I've found is, when people step up, and just start working on something, and if you encourage them, and you slowly give them more... I guess you give them more privileges, give them commit access, give them permission to close issues, they naturally tend to take up more responsibilities, because they feel they are trusted.

[41:15] **Evan:** I guess the key is, if you trust people, people will give back by taking up more responsibilities. Because naturally, they started working on this because they feel like they can contribute. And if they feel their contribution is valued, they tend to do it more. I don't actually try to push people to do anything, I think, most of the time, if they have ideas, they will directly ping me on our Slack or Discord. And they will try to get some feedback from me. And I would just tell them what I think. And then we would just let them do it.

[42:03] **Evan:** I guess I could theoretically do a better job sometimes by... If I were to... because I don't want to run this like a company where you have very detailed plans for everything you want to do, and you kind of assign them, and say, "Hey, this is what you need to do for the next three months or something." I'm just really glad that we have a lot of team members who are really really self motivated. And they come up with amazing stuff, I'm like, "Wow, this is really cool." It's really nice. I guess that's the good part of open source.

[42:39] **Evan:** Like Young does so much amazing improvements to... Like he did the CI UI completely just... I think we just briefly talked about this idea. And then a few weeks later, he just came up with this whole thing. He's like, "Hey, look at this." We also had this, the documentation thing, because Chris has been kind of busy with his work. So he's been not doing as active maintenance of our docs for a while. And then Sarah, Sarah Dresdner and [Fenen 00:43:16], they're just like, "Okay, we're going to take over."

[43:22] **Evan:** Sarah is organizing bi-weekly meetings to prepare for the docs updates for our new RFCs for the upcoming Vue 3 stuff. All of these, I didn't really like say, "We need to do this," but because they feel like this is the good thing to do for the project, they came up with idea. That is really cool.

[43:48] **Evan:** I guess if you run a company this way, it probably wouldn't work that well. But the nice thing about it being an open source project is we don't really have... we're not working for survival. I think that's the key. We don't have a burn rate, we don't have a runway, like counting down, like we have to launch something five months from now or we're dead. That relieves us from having to always rush for... think about what is the most critical thing. We can just take a step back and think about things like, "This is what would make the users experience better. This is what just benefits our users." We don't have to make a lot of these hard trade offs that companies have to make, because they're like, "Oh, this is nice, but we don't have money." Or, our burn rate just doesn't allow us to do that."

[44:51] **Henry:** I really like that point.

[44:52] **Evan:** Obviously, we still have to prioritize, there are a lot of things that we don't necessarily have the bandwidth for. But the thing is, we still have a lot more liberty in determining what we think is better for the user. And we can think about that in a very... we can think about for the long run, for the short run, we don't have to always be scrambling to survive for the next few months.

[45:18] **Henry:** I like your point about it being like, basically, nothing is really urgent. There's no sense... there shouldn't be a sense of that, because in a way, like what you said, we're all free to do whatever we want. The problem is that it's all self imposed guilt. Just like the pressures of other people, but in the end, you don't have to do any of that. And you don't have to listen to those people either. And so, how can you... if you want to talk about game theory, it's like an infinite game. You're like playing to not win, you're just playing to keep... you can keep going forever.

[45:54] **Henry:** And so, it's, how do we change that mindset? Because I almost feel the same with the whole VC thing. It's like we want to turn open source into like every other company.

[46:05] **Evan:** Right. And I don't think that should... Some open source companies, maybe they were started to be a company, but not every open source project was started to be a company, it could just stay an open source project. And I think that's a valid choice.

[46:23] **Henry:** Yeah. I almost feel like we need to learn to almost... It's like we almost forgot what are the differentiation parts of open source compared to other ways of doing things? And why are we trying to emulate how people make money and other like regular companies or how they are organized? We should learn to take advantage of those things. And it's going to call for different solutions.

[46:48] **Henry:** I guess related to that is, how exactly does somebody join the Core team? There's no formal process for that?

[46:55] **Evan:** Not really. Most of the time you naturally build your credentials by just stepping up and do things. If you are active, you comment on issues, you submit pull requests, you are active on our Discord servers. People will notice, Core team will notice.

[47:23] **Evan:** I think the recent... our most recent new member-

[47:27] **Henry:** Natalia.

[47:29] **Evan:** ... Natalia, she joined by... she's just being really active. She's involved in a lot of these community stuff. She's been submitting pull request here and there. And then because of all the being active in all the things, eventually the team members nominated her. Actually, I think Chris nominated her. He brought this up to me saying, "Natalia has been doing a lot of great work recently and a lot of us think we should add her."

[48:03] **Evan:** Also, like Derek Gusto JS, he pretty much runs our public Discord server. He's kind of engaging me, every conversation and all that. And then I think [Linex 00:48:17] nominated him saying, "He's been so active in our Discord server, I think we should just add him to the team."

[48:26] **Evan:** In some way, it's kind of a form of recognition for the work you've done for the community and for the project. Because when you join the team, you don't actually get assigned any formal of responsibility, you just keep doing what you've been doing.

[48:38] **Henry:** Yeah.

[48:40] **Evan:** So it's more like a recognition than anything else. And most of the time, you just earn respect from existing team members, and you become a team member.

[48:47] **Henry:** I agree. I feel like that's exactly what happened with what I was doing on [Dabble 00:48:51]. It's almost like, you almost need to add people before... Sometimes you might want to add people before they feel like they're ready, because adding them will actually convince them they're good enough to be on the team.

[49:06] **Evan:** Yeah and also when you formally recognize them as a team member, they have a boost of confidence and they do what they've been doing even better.

[49:21] **Evan:** But we try to... On our team page, we try to actually have a very vague thing, kind of like core focus, or like main focus, but it's not like, "You are supposed to be working on this, and you should only work on this." It becomes more like a thing like, "This is what they are known for before they join the team. And this is what, the area they are most active in, or have the most knowledge for."

[49:48] **Evan:** And we often have like... So, once people join the team, it's very common for them to say, "Hey, I also want to work on this, can you add me to this, add me to that," which is nice. Because when people become the team, you start thinking for the future of the project, and you just work on whatever you think is best for the project.

[50:09] **Henry:** Yeah, I like that. It's like we want to get people that are interested... When people are joining for the first time, they have this specific thing they want to do. And when they become more of a maintainer, they start thinking more holistically, like, "Oh, let's think about the project." And then they might do a bunch of other things, and then figure out the other thing is more interesting.

[50:29] **Evan:** And also, they, the team, specific for me is a really good resource to fall back on when I'm trying to make some like high level decisions. Because when it was only me, a lot of decisions don't carry that much weight. So I just do whatever I wanted. But now, we have so many users, we have a huge community, every decision kind of carries a lot of weight. So it also, me personally, it makes harder and harder for me to just make a decision on my own. So if I want to make a good decision, I have to run it by the team and just get people's feedback. "What do you think?" What do they think? All of the RFCs, right? We actually have an internal router review before we publish it. And all these things, a lot of the decisions, the team is really valuable in providing feedback and having different perspectives on what we should do and what we should not.

[51:28] **Henry:** I guess on a team page, you also put people that are not as active anymore. And we have this too, people that have left. I guess I wonder, do you have a setup for how do people transition out of not working on it anymore?

[51:42] **Evan:** I guess we don't have a... there's nothing formal about that. We just notice, "Hey, this person hasn't been active for quite a while," which is totally fine. Because we move on from things, we have things in our lives. But we still want to recognize the work they've done in the past. But at the same time, we also want to make sure we have a list of people who are actually still working on it. So people don't try to reach out to people who've already started working on it, which is kind of awkward. It's just a way to... There's really nothing super formal about it.

[52:29] **Evan:** I mean, we actually talk to... We decided to separate the list because we noticed a few of us hasn't been doing anything for quite a long time. I actually personally reached out to them, and saying, "Hey, we noticed that you haven't been doing anything for a while, hope everything's okay. We're moving to this lameness page." And they'd be like, "Oh, yeah, thank you." Most people are happy because when you have been involved in something, and you're still recognized for all the things you've done in the past, it's just good to keep it in mind, I guess.

[53:13] **Henry:** Yeah, for sure. I think we definitely want to recognize contributions. But then also in terms of... I guess I was getting at more like, if you give people commitments and then they're not working on it, when do you remove them from a security point of view.

[53:28] **Evan:** Yeah, that's true. Ultimately, I guess it's probably better if you have a written policy, saying, "If you feel like you don't have time to work on it anymore, please let us know. And if you don't actively work on this for more than a few, maybe a certain amount of months, then we'll have to remove your commit rights for security reasons." I think if you write these down, people will understand, which is totally fine.

[54:05] **Henry:** Yeah. Because I realized, when we did this, it was like, "Oh, I don't even realize how many things that people have access to." And it's really like, projects are really good at adding people in. But then remembering that we have to set up team accounts or passwords or services and making sure those are all written down and removing... When people leave the company, an actual company, [crosstalk 00:54:27]-

[54:27] **Evan:** Yeah, there's a lot of logistics.

[54:29] **Henry:** ... work.

[54:30] **Evan:** Yeah, that's the hidden part of the work. Another hidden part of work. I have to manage teams on GitHub and giving people permissions, remembering what tokens people have and stuff like that, which is... but ultimately, a lot of it is still built on top of trust. I think the nice thing about open source is, you work with them long enough, that trust, I think, is a really strong bond when you work all open source together.

[55:03] **Henry:** And it's really funny when maybe you've never even met them in real life, unless you meet them at a conference or something.

[55:10] **Evan:** Yeah. I still remember the first time most of the team met in Poland, I think? It's a pretty interesting thing. Because now that we have a lot more conferences, it's almost like a team get together at every conference. It is really nice actually. We want tried to organize a team gathering, it cost a lot of money. But if we have conferences, where everybody goes to, it's actually a very nice opportunity for everyone to meet offline.

[55:46] **Henry:** There was a time when you were tweeting that, someone was complaining that you were working on Vue 3.0, but it was not online or not open source code. But it's funny because I think people have different definitions of what open source means. And the code or the process and the people and all these things, it's interesting. And then, do they actually... are they maintainer themselves too?

[56:16] **Evan:** I think the original question actually came from Rob Eisenberg. He's the maintainer of Aurelia, which is technically a competitor framework, I guess. Personally, I just feel that, he obviously thinks that not being open source from day one is problematic, which I don't really think. I honestly don't understand why he thinks it's problematic.

[56:47] **Evan:** And the thing is, the way I tend to develop things is, I don't really go the way of like designing everything perfectly, then just write the code as just perfect from day one. I like to start really really scratchy and just a bit of here and bit of there and try to tweak things into shape until I feel like this is at the stage where it's okay to show it to people and gather feedback. Because even now, we still have a part of the code base, where I'm trying to untangle and try to make it make more sense out of it.

[57:30] **Evan:** The thing is, if you think about, especially for a project like Vue, because we have so many users, we have to strike a balance between being open about the process, versus being able to just focus on the things we want to do. Obviously, we want to be open with what we're planning to do. That's why we wrote a post on the high level stuff, that we plan to doing Vue 3 last year, very very early on. That was when Vue 3 was just nothing but a bunch of ideas, and a very, very rough prototype.

[58:09] **Evan:** And then, of the past few months, we've published RFCs on most of the breaking changes, or major new additions that we want to do. So if you look at our existing RFCs, you pretty much have an idea what a Vue 3 will look like by now. I think, the reason that we're doing RFCs, and having the code in private for now is so that the discussion can be focused on the actual design changes, instead of the underlying technical details. Because even today, we still occasionally receive, pull requests, having it open, and people will submit pull requests on code basis that you're not... which is not even final yet. Even today, we still receive a lot of pull requests, people are just changing one line of code style, changing how we write a four loop, or just asking, why you're doing it this way.

[59:03] **Evan:** This kind of noise, if we are open source from day one, people will start doing things like this on code that ourselves are not even sure about. And it's just a lot of distraction. And also a lot of these internal things. Especially when we were working on the prototype, the RFCs were actually developed in parallel with the internal prototype, where the RFCs are actually based on some of the observations we've discovered while working on the prototype. So, the prototype serves as the testing bed for some of these ideas.

[59:47] **Evan:** And in order to do that, we have to just try out a bunch of stupid things, or just say, "I'm not sure how this API should actually be designed, so let's just go with this first and just implement it, see how it works." When you do that, and if people are just reading the code or following your commits, they'll be like, "Oh, this is how Vue 3 is going to work. And they'll write blog posts, "Hey, they just pushed a commit, they're going to do this in Vue 3." That's going to just create a lot of confusion. We don't really want that to happen. We want to make sure the moment we open source it, there's no room for people to just interpret it differently than what we intend it to be. So that's the reason we kind of keep the code private for now.

[01:00:36] **Evan:** But we try to discuss the actual changes through RFCs in as much detail as possible. In every RFC, goes into a lot of depth in explaining, "What's the current problem, what's the historical issues and how this problem has evolved between Vue 1, Vue 2 and why we're changing to Vue 3," which I think is a lot more valuable than just reading a bunch of work in progress code. And we actually spent a lot of work in writing those RFCs.

[01:01:11] **Evan:** That's just my take on it.

[01:01:12] **Henry:** Yeah.

[01:01:12] **Evan:** I personally don't feel like open source literally means the code has to be there from day one.

[01:01:21] **Henry:** That makes sense. And in a way writing the RFCs, it can help people focus. It's like, caring about the abstraction versus all these details that we're going to change anyway. And that trade off, it's not like you're intentionally not allowing people to see it, because you don't want them to, but that it will end up being better in the long run, because there's no reason for people to try it, if that's not what you're looking for at the moment.

[01:01:51] **Evan:** Yeah. I think at this stage, if we open source at this stage, at best, it'll just fulfill some people's curiosity, and that's pretty much it. It won't really help that much in terms of discussing what the high level the framework should do. Because the code really is just implementation details at this point. And there's still a lot of things to change before an actual version of Vue 3 is published. I mean, we'll probably open source it by the time we think like most of the architecture is relatively stable, so that we won't do huge overhauls anymore. But I just don't feel it's at that stage yet. And also, we don't actually have a set date on when exactly we're going to release it because we want to make sure we finish all the things that we wanted to do. Like I mentioned before, we're not trying to hit a specific deadline, because there is no reason to have a deadline, really.

[01:03:04] **Henry:** Yeah. It's funny, because I see a lot of projects do that, like React. They did that with Hooks in a way. It wasn't like... they didn't tell everybody they were working on it, they told a few people and they react about the release, same thing. So it seems like everyone's doing it at the same time.

[01:03:22] **Evan:** It's really funny because I think two days before they announced it at React Conf, Dan Abramov was actually in New York. He was visiting. I saw it on Twitter. So he was meeting up with Kim Wheeler, Rich Harris and [Karen 01:03:40].

[01:03:40] **Henry:** Oh yeah.

[01:03:41] **Evan:** And I was like, "Hey, can I join?" And they were like, "Hell yeah." So we actually met up that night. And we had a drink at a bar in New York, and we talked a bunch of open source stuff. But they didn't mention a word to me about Hooks. So I didn't really... I was right there sitting right next to Dan Abramov, and he didn't mentioned a word to me about Hooks until he announced it two days later.

[01:04:05] **Henry:** I was going to go to, but I think I came back the day after, and I was talking with him.

[01:04:11] **Evan:** It was really funny, because two days later, I was watching the talk, I was like, "Damn, he didn't even tell me."

[01:04:19] **Henry:** Another question I was interested in hearing about was, it's funny, I feel like this conversation we're talking about freedom a lot. It's interesting in... Going back to this, I talked to Michael about this idea, like open source licenses only affects the consumption of open source, like allowing who can use it. But it has nothing to do with production. If nobody ever asked the question, it doesn't affect your ability to work on the code. Because if they're not making issues or anything, they're just consuming it, then you're still free to work on whatever you want. And that's basically the maintainer attention. It's just like how much time you have to spend.

[01:05:03] **Henry:** And so I thought it was cool that, it's like, you spent the time to make something called... like VuePress. I think to him, it seemed like something kind of out there. To me, it has the name, it's still related to Vue, you can do whatever you want. I guess, what inspired you to work on that or feel like you could do that, I suppose.

[01:05:26] **Evan:** I think VuePress initially came out of the need for something to write our documentation. It's powering most of our sub products now, except our main site, which is just too much to migrate at that point. But a lot of our side was originally powered by GitBook, it's funny, because GitBook was slowly just moving towards a completely commercial offering. And they're paying less than less attention to the open source part of it. Or it's still open source, but it's just like the documentation. You notice a lot of documentation are redirecting to the commercial side of it. And also, the generations, like when you run GitBook, the hot reload is really really slow, especially when you have multiple translations in the same project. We have to wait like 67 seconds on each reload, which is really not feasible anymore.

[01:06:33] **Evan:** And then there was other inspiration like Gatsby, which is really cool. But it was kind of a bit of, I guess, heavier. And also, it's not really tailored for documentation. And then I was looking at Gatsby, and also Nuxt also kind of can do static generation. But both Nuxt and Gatsby are kind of geared towards websites, or apps. And I just want something that's super super focused on allowing you to just write markdown and just turn the markdown into a bunch of static files.

[01:07:07] **Evan:** I didn't even... I think VuePress is one of those projects that I didn't even have a clear idea of what it would actually turn into. I just had this idea, started playing around with it. It's just a bunch of script files and then I realized, "Okay, this thing kind of works!"

[01:07:26] **Evan:** I guess it's a similar process to when I first started playing with Vue itself, just an idea, then I started playing with it. And then like, "Hey, this actually kind of works, has potential." It kind of sort of distracted because I was working on CI 3 back then, then I started writing the documentation for CR 3. And then I was like, "Okay, maybe I just play around with this idea, just quickly, turn a bunch of markdown into a bunch of static files." I ended up spending a whole month working on VuePress instead. It was also kind of a good switch of pace, because I had been working on the CI for such a long time. And just working on a completely greenfield project feels really good.

[01:08:21] **Evan:** The reason it kind of seems out there is because I didn't want it to be so strictly tied to the framework. It's just sort of an extension. Also, kind of a hobby project, almost. Because I really miss the day when everything... for a long time, everything I do is just officially the Vue official stuff. And working on VuePress was kind of that rare experience, I'm kind of positioning myself as just a random community member who wants to build a cool thing. And that feeling is... I haven't really had that experience for a long time. So it was really good switching gears, I guess.

[01:09:07] **Henry:** Yeah. I think that's really important, what you're saying, you have this vision, and you're going for it, but then you kind of maybe you feel burnt out or you just feel like it's not that exciting. And then you almost don't allow yourself the freedom to be able to try out new ideas. And a lot of these new ideas can turn into amazing work. But it's like you're scared of it because you think, "Oh, what if people think XYZ about this."

[01:09:33] **Henry:** And it's funny because even the other thing you made with the open source, that was kind of random, too.

[01:09:39] **Evan:** Yeah. These are the things that I think I enjoyed most when I first started playing with open source stuff. When I first had my GitHub account, what I enjoyed most was just come up with these super random ideas, and then just push a new repository, didn't really even care if people would notice them or not, it just feels really fun. It's almost like a hobby. I just came up with new, funny idea and I wrote all the code for it.

[01:10:10] **Evan:** It's almost like people who build stuff at home, though really delegate models, like robots or stuff like that, this process of just creating these things is really enjoyable. I think I occasionally really want... I try to constantly remind myself, "This is really important to keep this thing alive so that... " It's also a really good way to sort of, I guess, just relax, because when you're working on something that has no history burden, there's no obligation or anything, you're much more free to just let your creativity lead to whatever you want, where it wants to go. Instead of working on Vue today, there's always a lot of constraints, a lot of trade offs, a lot of things to keep in mind, every move you take just carries a lot of ways compared to when you are working on a side project. It's almost a relief to be able to just work on a side project.

[01:11:20] **Henry:** There is no mental load of all these different trade offs and all that stuff. I guess that makes me wonder, how do you schedule your days? Do you tend to be someone that organizes everything out, planning it out? Or, you just have a lot of downtime, and then like, "I'm focusing on this specific task?" Because I find for me, when people are like, "Oh, what's your day look like?" I'm like, "Every day is very different." I don't really schedule anything anymore.

[01:11:47] **Evan:** Yeah. I try to give myself a high level plan, kind of like, "I want to finish this in these two months," or something like that. But to be honest, I rarely ever, strictly follow it through, because, making plans is always hard. And occasionally there will be distractions like VuePress, which I did not have it in plan, but I ended up just spending a whole month working on it.

[01:12:16] **Evan:** At the same time, I guess, have a high high level plan, but stay flexible. And as far as I know everything I'm doing is aligned towards the high level goal of making Vue better, I think that's fine. And the best part about working for myself, is I have the power to make those adjustments. I can pretty much make adjustments anytime I want. Ultimately, the Vue 3 process is probably a bit more organized. But I intentionally give myself a bit more bumper time, and don't really want to spend that a specific deadline, because I feel that having a specific deadline isn't really going to help with the ultimate outcome. There's also a lot of family stuff going on which...

[01:13:12] **Evan:** Another part of working for myself is, I get to spend a lot more time with family. I'm in China right now and I've been talking to some of the friends that have full-time jobs at some of the companies in China. And I just noticed that if I actually live a 9:00 to 5:00 job, I would actually be spending way less time with my kids compared to now. So kind of really appreciate what I'm doing, that kind of allows me to be able to have this flexible schedule.

[01:13:51] **Henry:** I feel like even with just... it doesn't have to be open source, but I guess yeah, not doing the 9:00 to 5:00, it's like, you should be able to feel like you can work less. Because like you were saying earlier, our work input isn't necessarily tied to the output, and so you can be flexible. And there are days where you don't have... Before I was like, every second, I feel I have to work. And then you have to figure out how to set boundaries and stuff. And I still struggle with that. Do you feel like you've been able to have healthy boundaries in terms of work and life balance scheduling?

[01:14:30] **Evan:** Yeah. I definitely think I've improved a lot since I started doing it full-time. I think in the early days, I had this problem where, there's just no clear line between work life, when you work from home, but later on... The funny thing is, since I had kids, everything has been... I've pretty much been forced into a very regular schedule. Because my wife is very methodical when she takes care of the kids. She has a really strict sleeping schedule for our baby. And in order to follow through that I have to wake up and go to sleep at very strict times as well, which forced me to have also a very solid schedule for work.

[01:15:16] **Evan:** So, it's funny, because ever since I had kids, I had been living a very, very scheduled life.

[01:15:22] **Henry:** Certainly funny, because, Michael, on the previous podcast, he said the exact same thing, that helps them with time management.

[01:15:28] **Evan:** Yeah. For example now, because I'm taking my son to kindergarten every morning in China right now, so I go to work right after that. And I have to wake up at 7:00 every morning, which is just hard to imagine when I was single.

[01:15:44] **Henry:** Uh-huh(affirmative). Well, I guess another question is, do you feel like being a maintainer helped you or made it worse to prepare you for being a father?

[01:15:56] **Evan:** Honestly, I don't know, because I don't really have enough to compare, because I... I actually went full-time open source when my son was born. So, all the time that I had kids, I've already been working for myself.

[01:16:13] **Evan:** But thinking back, I think it's probably... honest, I don't know. One thing I know for sure is having kids definitely sort of pushed myself to be more... gave me more motivation to work on this whole thing. Because I feel that having kids is a lot more responsibility than before. And when I was just myself without kids, I feel like, sometimes I would think, "I would just work on this thing as a hobby, I would just go do other things. And probably why I would treat this less like a job or anything." But now it gives me more reasons to make sure that Vue is doing well, it's going well, because this is how I provide for the family.

[01:17:10] **Henry:** That makes me wonder, are other things outside of tech that inspires you? I know that you have a background in art and art history. Are you still into that and researching that?

[01:17:23] **Evan:** Yeah, a lot less. When I was in college, I studied art history. And in my grad school, I actually studied a program called design technology, where there's a lot of an intersection between art and technology. There's a lot of new media art, for example, using codes to generate... generated art, using codes to generate live video, audio, detecting human positions, like AR VR, we played with that back in school. So all of these things we pretty much all touched upon, even physical computing, like controlling physical stuff with Arduino. A lot of these are super fun to play with, but now... I'm still super curious about these, occasionally follow some of the exhibition's but honestly, I don't really have time to do it myself anymore.

[01:18:23] **Evan:** But I had a graduate classmate, he was my classmate at Parsons, and he's also from China. And now he's running... He's actually doing a startup in China all about creative arts, like digital arts education and stuff, which is really cool. If I wasn't doing open source full-time, I would probably do something like that.

[01:18:52] **Henry:** Do you see yourself doing this for a really long time?

[01:18:55] **Evan:** Yeah, I mean, he seems to be good, doing pretty well. For as long as I can vision, as long as web technologies hold an important piece in how people interact with technology, I think there's going to be room for Vue. And ultimately, I also think, if we look at really long term, fundamentally, I think Vue is just... if we take it out of the context of the web, it's just a set of ways for people to build interfaces. So even if one day, the web is no longer a thing, or Vue is no longer a thing, I think as long as there's a need for people to build user experiences, to build user interfaces, I'm probably going to be working on something related to that space.

[01:19:54] **Henry:** In that space. Okay. Awesome. The last question is, what would you do differently when deciding to do this full-time? And do you recommend people to try [crosstalk 01:20:06]?

[01:20:06] **Evan:** What would I do differently? Honestly, I don't know. So far, everything just... I would say most of the things that happened since I went full-time went better than expectations. So, what I would do differently if I knew things earlier, I would just switch to TypeScript earlier.

[01:20:32] **Evan:** Other than that, not much.

[01:20:34] **Henry:** I guess even dealing with tax, health insurance and like [crosstalk 01:20:41]-

[01:20:40] **Evan:** Yeah, I had a pretty... I would switch to a cheaper plan earlier, because I was on Cobra for 18 months.

[01:20:49] **Henry:** ... Me too.

[01:20:50] **Evan:** Turns out, it was much more expensive than if I went with a market plan earlier. That was something I could have avoided. And then maybe research taxes earlier, because the first two years my income, it wasn't really that high, I didn't really have to worry about it too much.

[01:21:16] **Evan:** And now, I guess it's just the lesson to life. When you realize, "Oh... " you're hitting a certain bracket, and there are certain ways to help you, especially when you work for yourself, you can still put money into an IRA, you can have a self employment IRA, if you want to put more tax deferred dollars into it, kind of learned it the hard way.

[01:21:46] **Evan:** But these are really specific stuff. I realized I was paying much more tax when I was above a certain threshold. But if I put some dollars into this self employed IRA, I could just pay much less for that year. And this money, it's tax deferred, I could invest it, and all that.

[01:22:13] **Evan:** But I mean, you kind of have to learn it the hard way. Otherwise, I just don't know, because if you don't actually run into this situation, nothing would actually trigger you to say, "I actually need to know about this."

[01:22:28] **Henry:** I feel the same way. It's like, there's not really much advice other than when you finally have the faith to just try it. I mean, all this stuff, you'll just figure it out eventually. And you don't have to immediately do any of it. All that stuff is kind of like saving you [crosstalk 01:22:46].

[01:22:46] **Evan:** I mean, don't worry about it too much. It's like glasses, right? You know you need it when you need it. Because honestly, when I first went full-time, somebody actually told me about a lot of the stuff. But I was completely confused. I'm like, "Why do I need this?" Kind of understand it, but I honestly don't feel it's urgent or it's anything that I would want to spend time on at that point. So, I just let it slip through. But later on, when it actually did could help me, I just naturally started to research about it.

[01:23:24] **Henry:** Yeah. I feel like that's just like open source in general. You kind of go into accidentally, but you have this little bit of vision for what you want to do, and stuff falls into place, which isn't the best. It doesn't feel that great, but that's how it seems to work out.

[01:23:41] **Evan:** It's always risky. If you choose a path that you have no... there's not a large amount of references that you can sort of coordinate yourself, compare yourself against. You would obviously feel much safer if there are a lot of people doing similar things that you can learn from. I think one of the good resources is Indie Hackers. Although a lot of these Indie Hackers case studies are more about building Indie products, sort of, or some of them are actually like sort of bootstrapped to startups, but still, there's a lot of good resources. The mindset is kind of similar, when you first start out, you have to sort of... in order to make a living, you still have to sort of first start to think in a more... you're essentially a bootstrap entrepreneur. So you still have to learn a bit about the business perspective things, like how to properly market stuff, how to actually generate a sustainable revenue stream.

[01:24:55] **Evan:** But I kind of learned it along the way. In that sense, I feel that, I guess, I more or less naturally had a product mindset. Because when I was building Vue, I positioned it at the same time as a... It's almost like in order to grown Vue like it is today, where it's more like a pure open source project, I had to start whereby thinking about it as a product in some way.

[01:25:30] **Evan:** But my ultimate goal is not really to turn it into a product, which is kind of funny, but this is what allowed me to get to where I am today. So it's still necessary. If anyone wants to go this route, they still have to sort of learn about the basics of all that which, and I think Indie Hackers is a really good resource to them.

[01:25:52] **Henry:** Awesome. I think that's a good place to stop.

[01:25:56] **Henry:** Thanks for listening. Check out our website maintainersanonymous.com for show notes and transcripts. If you have any feedback, ideas or guest suggestions, you can reach me on twitter @left_pad.

[01:26:05] **Henry:** If you like to support the show, you can visit patreon.com/henryzhu.
