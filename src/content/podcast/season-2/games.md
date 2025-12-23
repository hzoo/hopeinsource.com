---
title: "Mastery and Learning through Games (Anthony Giovannetti)"
season: 2
date: 2019-06-21
time: "57"
description: Why play or even make games? Anthony Giovannetti (MegaCrit) joins
  Henry to chat building the video game Slay the Spire with the community. They
  discuss games an a interactive medium, immersion, player incentives/tradeoffs,
  emergent gameplay through roguelikes (procedural generation, permadeath),
  player mastery/difficulty, Steam early access, user feedback, importance of
  testing, data-informed balancing, and player accessibility driving features
  via streaming, translations, and UX.
episodeLink: https://anchor.fm/s/ff707650/podcast/play/96461753/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-11-31%2F392345708-44100-2-7150ee07b7132f8a.mp3
embedUrl: https://podcasters.spotify.com/pod/show/hopeinsource/episodes/MA-8-Anthony-Giovannetti-on-Mastery-and-Learning-through-Games-e2su9fp
sidebar:
  order: 8
---
### Transcript

> Conversations may be edited for clarity. [(edit)](https://github.com/hzoo/hopeinsource.com/blob/main/src/content/podcast/season-2/games.md)

[00:06] **Henry:** Today I have with me to talk about game design, community building, and Indie game development, one of the co-founders of the Seattle based Indie game studio MegaCrit. I have the the GM here with me, Anthony Giovannetti. With Casey Yano, he started the install team to create this game, Slay the Spire. It's a single player roguelike deck builder Video game, has overwhelmingly positive rating on steam with over 25,000 reviews, and just got a Nintendo switch release, which I just got. I think I played about over a hundred dollars on steam version. So yeah, thanks for joining the show.

[00:37] **Anthony:** Yeah, thanks for having me. Good to be here.

[00:38] **Henry:** Yeah. I guess just to start, I was going to say that I didn't want to turn this podcast into a game podcast, but I think you've also mentioned that you grew up with board games, in a similar way I grew up playing video games, and I remember my dad always telling me, "When are you going to grow out of board games and video games?"

[00:57] **Anthony:** My parents did the same thing.

[01:00] **Henry:** It's like, here we are talking about ... you're making them and then I'm ... I feel like I'm so ... I don't even play as much but I'm still keeping up to date with games that are coming out or watching TDC talks even though I don't even make games at all, or listen to podcasts about them. I think it's just this idea of games and systems, it's really interesting. So I think it'd be cool to talk about that.

[01:24] **Anthony:** Definitely.

[01:26] **Henry:** Yeah. I guess maybe we should start off because not everyone is into games. Maybe we can start with just why people like games in general, and what makes them unique as opposed to I guess, different genres of communication and also entertainment.

[01:43] **Anthony:** Sure. So what makes games fun is it's interesting because it's kind of a very large and hard to answer question. Right? And it's oftentimes different for different people. So there's a lot of factors that go into games and make them so compelling. And for me personally, the thing that I really like from games is that you're exploring these interactive systems and making interesting decisions and then developing mastery. That's the thing that I like about games. But then you might have other people who they really like games for their stories, they really like getting into maybe an old game like Planescape: Torment or something and just experiencing that story, or they're more about exploring or building a character that they identify with. So Games really offer a lot of different paths to enjoyment and fun.

[02:43] **Anthony:** But for me personally, what I did with Slay the Spire was we tried to make it very systems focused game. So it's very much about the game play mechanics and exploring those and developing mastery as a player.

[02:56] **Henry:** Right. That's true. And it also sounds like games can also be all of those things. And I guess a game like Firewatch it is mostly about story versus a music game where there's not really that much choices other than just playing the instrument kind of thing, and it's just that enjoyment.

[03:17] **Anthony:** Yeah. It's more of an activity.

[03:19] **Anthony:** Yeah. I know that there's a lot of academic discussion about why games are fun and things like that. And I actually don't concern myself with the esoterics of that too much. I try to take more of a pragmatic approach and in my game development, and I try to think, okay, what are the things that I like? How can I take those values and then really emphasize them and do those correctly?

[03:45] **Henry:** I just watched this I guess talk that Jonathan Blow gave, I don't know if it's a talk, but I just liked the title and it says Games on the future of human thought, which is a very big statement for him to say. But I thought it was interesting that he talks about how ... I mean, essentially a lot of this is about, you mentioned mastery. So I guess it's about learning. This idea that before we had language you would learn by watching, and then once we had language you could talk to people, and then we had writing, you could retain that information over time. And then through writing, maybe we had radio and podcasting and films. And then we finally get to this point of games where it's like you can actually physically or digitally interact with systems or people and that is very different from all these other mediums where it feels more one way or they explicitly makes things too late.

[04:41] **Anthony:** Right? Yeah. I guess what's unique about games is that they're inherently interactive feeding back into the system. However, I mean, games have been around for a lot longer than video games. Like Chess and Go have been around for a long time. And so that dynamic has been there just not in digital form or we can explore so much more.

[05:00] **Henry:** That's a good point too, I guess. And even board games too. Right? And I guess what would you think are kind of the distinctive between board games and video games? Why have you decided to do a video game when your background wasn't working?

[05:17] **Anthony:** Sure. So just to clarify for people who don't know, I actually ran a board game store for a long time, sold a lot of magic cards, and yeah, that definitely was a large influence in Slay the Spire because I have this large card game board game background. But I mean, primarily the main difference between them is just the medium and how much more you're able to do with the digital game. But for being an Indie, to me being able to do digital games it's the only way that actually makes sense. It's so much harder to make any kind of money or a foothold in the board game industry, you're a lot more limited with what you can do, you don't have an entire computer capable of doing all kinds of different things, so you're much more limited by components and the rules that people have to actually learn from a rule book and things like that. There's all kinds of little things that you can do with UI that digitally you can actually convey much more information and even little things like, for example, in Slay the Spire, you don't have to shuffle your deck manually every time, that's always a pain point in dominion or you get tired after you've played your hundredth game of dominion of just shuffling and shuffling and shuffling your little deck. It gets really tedious.

[06:43] **Anthony:** So digital games have a bunch of advantages I think actually. To me the primary advantage that a board game has is that you're sitting down and playing with friends. So it's more that kind of local comradery, that that friendship, that's what a board game can do really well. And Slay the Spire is a single player game. So I think single player games it's like just strict victory for digital games over board games. I've never played a single player board game that I liked. So

[07:15] **Henry:** Like Solitaire or something. Although a lot of people say that Dominion is like Solitaire.

[07:20] **Anthony:** Yeah, I mean, Dominion is definitely a low interaction board game I would say.

[07:24] **Henry:** It's just funny that you brought up the shuffling thing. The other sense is that if you don't get card sleeves then maybe your occurrence can't use the line and then you have to buy new ones if they get ripped and stuff, and obviously there's no issue with that in the digital world.

[07:38] **Henry:** To me it felt like recently with video games it used to be that there was couch co-op kind of thing and you bring people over and you have land parties and stuff and now it's like all the video games have become multiplayer games but on one screen where everyone has their own console. And then slowly I guess board games kind of came up again and then people are kind of doing that to get their multiplayer experience locally in person.

[08:08] **Anthony:** Yeah, I think that's definitely the case. It's been interesting to watch how the industries trend over time.

[08:13] **Henry:** Yeah, I guess getting back to this idea of being interactive, I've been doing some random research about this philosopher, Michael Polanyi, and I liked this idea of mastery where, the way we learn things might not be literally through teaching someone by reading something, but through the practice of doing something. He talks about this idea that sometimes we lose knowledge, not just the data or something, but kind of the process. So maybe we've kept the artifact of what's left but we don't remember how to make it. And he thinks that the reason why is because we've lost this idea of even tradition and apprenticeships. And so he brings up this idea of indwelling, which is kind of taking on and living in that thing that you're trying to learn about. And I think games are a perfect way of doing that where it's like, when you're playing a game, you're immersed in this world or environment and it helps you to be personally attached to the thing you're learning or playing, instead of kind of observing it from a detached point of view.

[09:20] **Henry:** And I think games in terms of ... he likes this idea of, when you learn something new, it brings new possibilities into what's there, and I think games are kind of ... it helps you create a sense of imagination on what's possible. Especially in a systems game where it's ... especially in Slay the Spire, right? It's, you have these different cars that randomly appear and you have to pick which ones and then you're thinking through what combinations are possible.

[09:48] **Anthony:** Oh, that's for sure true. It's very hard to learn all kinds of domains just by observing and reading. Getting your hands into the thick of it and experiencing whatever it is is always going to be a better experience for how human brains are configured. So it makes sense why we like games so much. You can watch all the basketball you want, but you're going to have to actually go out and play to actually develop some kind of mastery.

[10:15] **Henry:** Or reading a book about basketball rather than ...

[10:17] **Anthony:** Yeah. It's not going to do anything for you because that's just this ... it's not fundamentally how human brains are able to experience things.

[10:26] **Henry:** Yeah, I guess thinking about that, I feel like a lot of different disciplines or industries could learn from gaming. So whether it's programmers or architects or people put in economics, right? Which is all about incentives. And I think a lot of times going back to my dad's saying, it's just, "when are you going to learn to get over that? You're older?" People still think that games are just a fun thing or leisure. I mean, they mostly are, but I think if you're developing this kind of thinking through it then people can incorporate that into other aspects of life.

[11:07] **Henry:** Also, I think without doing the whole gamification thing where you just attach points to things. Right?

[11:13] **Anthony:** Right. Yeah. Just some extrinsic reward. Yeah. I mean, I definitely think that video games are just like a mindless distraction that's bad for you is more of a thinking of, at least my parents' generation. I've seen some research that seems to indicate that playing games can actually be good for your mental health and various other things. So when surprises me in the slightest.

[11:37] **Henry:** Yeah. So I brought up incentive. When someone's playing your game, I guess, what is your goal for wanting them ... what do you want them to do? Other than just having fun, but throughout the process of this, what do you want them to actually learn?

[11:50] **Anthony:** Sure. So at the higher level? So one of the things that we try to emphasize is we want to encourage people to explore different paths. So what I mean by that is we don't just let people choose their starting deck. Sometimes people, they even request like, "Hey it'd be really nice if I could pick a starting rare or something so I can kind of direct where my deck wants to go at the start of the game." And that's actually a conscious design decision that we said, "Hey, we don't want to do that. We want to force you to engage with the system and try new things out every time." So that was a big goal Slay the Spire.

[12:34] **Anthony:** And then another was that we would have a concept of risk versus reward. So we wanted paths that were less safe choices that you could make that in the short term would increase the difficulty, but that would yield long term rewards so that players could try to be greedy, and actually test themselves on their evaluations. So those were some things that we were taking into the game that we really wanted to let people explore.

[13:02] **Anthony:** And then on top of that, there's the school of thought of games are a series of interesting decisions, and I tend to agree with that as those are the kind of games I like the most, and I really, really wanted to have as many high impact choices as possible in Slay the Spire, which is why after every combat we give you one big choice of, okay, what card are you adding to your deck now? And then there's a bunch of other different choices in the game, but we want to just constantly reinforce things like that.

[13:35] **Henry:** I think it's interesting thinking about the risk reward idea. And also, I guess similar to that is short term, long term, or temporary gain, permanent gains. It's weird because I feel like a lot of us are at loss of ... like how do you teach people to be okay with taking the risk?

[13:53] **Henry:** And especially in the genre this is in which is the rogue life, which I guess we can just think of what that is, I guess we would say that rogue type games or games where there's some kind of randomness involved and then a permanent death where when you lose you have to start over. And so I-

[14:11] **Anthony:** Yeah, and to clarify really quick, sorry, it's just by randomness I would say that usually there's some kind of procedural generation and how the game is constructed. So memorization doesn't really help.

[14:21] **Henry:** Right. And so I guess it's funny because it kind of hits against this assumption that, the only way I'm going to enjoy this game is if I always win or whenever I find a way that will lead to that kind of success. And sometimes maybe the reason why I like this is because I'm okay with not ... and the joy is just being better and learning the systems, but it's hard to get people to think differently about that. And I think that might be where some people might say this game is bad because it's too hard, or I lose too much. That kind of thing.

[14:56] **Anthony:** So I guess you can always have people that dislike a game because it's too hard, and that's fine. I don't think that every game needs to be for every person. And if you don't like games that are too difficult maybe Slay the Spire won't be for you. And that's okay. I think that it's foolish to try to make a game that pleases everyone and then you're just not doing a good job of pleasing the ... you can make everyone kind of like your game, but then you won't have people that just absolutely love it. And I really wanted to make a good game that people would actually really fall into and love and put hundreds and thousands of hours into, and that's what we try to do.

[15:46] **Henry:** Okay. I mean, we talked about a bit about players wanting to force certain, I guess, strategies that they have. I think you've talked a bit about, eventually when you play you're like, oh, this is the way that you win. They feel like they've mastered it. But you're saying that you didn't want to design the game such that you can necessarily choose because the point of it is to adapt to what's going on. So I guess, what do you think about ... I mean, obviously it's fine for people, and you create these kind of archetypes, but I guess, how do you balance allowing people to exploit those but then also not have to know that that's the only way to win?

[16:28] **Anthony:** Sure. So that was one of the key balance things that we spent a lot of time on, and I'm really happy with how it turned out because I think we did a good job on. And so how it works is there are certain decks and relic combinations that if you can reach it you can say, okay, this is going to be a sufficient strategy to beat the game with. Right? But what we do is we make it sufficiently hard to reach those endpoints. So one, you have to know that, hey, that is a viable strategy that will work, but then two, you have to work really hard to get it, and then three, you just might not be able to get it every time. And so that's what makes it hard to reach and forces you to try other things.

[17:15] **Anthony:** And then you can see that we have a bunch of different strategies within each character that are viable to beat the game. And we wanted to create different silos, gathers a poisoned strategy, there's a shift strategy, and these would be useful mainly for newer players as it's important for somebody who's sitting down to be able to look at some cards and to be able to say, "Hey, I can see what I can do with this." If you pop up a catalyst, which is a card that doubles the poison. It's not an enemy, you can look at that and then say, okay, I can see how I can abuse that and I can see the strategies that I could try to use to kill enemies with this.

[17:57] **Anthony:** And that's a really good thing that's useful for teaching people how to play. And then as they play more, they'll realize that, oh, actually I don't require just the strategy. They're not always going to have access to that card. They're going to be kind of at the whims of what the dungeon's giving them, and that's going to force them to explore other things. And as they try out other strategies and see what works and what doesn't, they're going to build up these mental heuristics and figure out what works.

[18:26] **Henry:** I guess related to that is, I saw this website called Spire Logs, and maybe people, I think they get to this point where they're like, oh, I wonder what other people think. And so in other games there are tearless and now maybe there's certain sites that tell you, oh, you should do this. I guess, what is your opinion on that stuff?

[18:49] **Anthony:** I'm actually really happy that Spire Logs exists. In fact, during development, Casey and I thought it'd be really cool if fans made sites like ... we didn't say Spire Logs, but we said analysis sites, and people would talk about strategies and stuff. Because I'm a big card game gamer myself and I always love going into Reddit or other forums and talk about top tier strategies with people, and I think that in itself is kind of engaging and fun for a more hardcore subset of a player base. And so that was something I actually hoped would be creative. And so when it was, I was like, oh, that's really cool. And you can certainly use that data to help your game, but just relying on sites like Spire Logs is definitely not going to take you to the peaks of players' skill.

[19:44] **Anthony:** There's a big streamer, who's probably one of the best Slay the Spire players in the world, and he's posted videos on why you can't totally trust those stats because they can be useful, they can help to guide your reasoning and your mental heuristics, but you can't just look at a card and be like, oh, 56% of the time this is in your deck, you win with it. That doesn't really contain as much information about, okay, yeah, but what else is in your deck besides that card? What relics do you have to synergize with it? These are contextual things that are going to vary run by run, and that will change the evaluation of a given card.

[20:31] **Anthony:** And so that's part of what I was getting into earlier where because things are so dynamic in Slay the Spire, what you will want will change on a run by run basis and that increases the player's skill cap because you can't just like, okay, if I see this card I'd always take it. You have to decide, hey, does this card work with my deck at this time? Does it solve the goal that I'm looking for? You can make decisions that are like, oh, I need a fight in the elite that's coming up. So I need a big damage card to add to my deck. So even though I would like to take this card, I should take this damage card instead to help me for this elite fight. And whereas maybe five rooms later you'd like to swap, which should those cards you took. So those are the kinds of things that make for more rich and interesting game. More interesting decisions.

[21:23] **Henry:** Right. So maybe that number nascent looked objectively, you should always take it, but obviously, one decision is actually a bunch of decisions because of all the context that you were talking about.

[21:36] **Anthony:** And part of why this works is when we sat down to design or to balance Slay the Spire ... and really quick, this is an advantage that digital games have over board games. This is something I thought of going back to that earlier is that I know just as a card game player that you can't achieve "perfect balance" in a card game. Like if you have hundreds and hundreds of cards you're just not going to reach perfect balance where every card is equally good all the time.

[22:06] **Anthony:** So instead what we tried to do was we wanted to make it so that almost every card in the game has at least some percentage of the time when you would like to take it. So there are cards that are better than other cards, but you should still want to take the other cards some amount of the time and add them to your deck and play with them. And if we could do that, then one, it would actually be a goal that we could achieve because it's significantly easier to do, and then two, we could reach this state of the game that I've been talking about where you still have plenty of interesting decisions to make and they're contextual.

[22:46] **Henry:** I guess it's different for a single player versus multiplayer balancing, but yeah. And then also, do you want to speak to that too?

[22:57] **Anthony:** Yeah, sure. That's a big part of why Slay the Spire works. If it's a game Hearthstone, if you just have a card that's better than another card you'll just always play with it in your deck and that's what the Meta game will be. Right? But Slay the Spire is single player and it's rogue like so you don't get to choose what's in your deck. So because of that we can allow for a more dynamic range of balance and still have things to be played. And then also we can allow the player to sometimes be overpowered because it actually feels really good when the player does reach that state where just all the gears are turning smoothly and you're just crushing the enemy and they'll have a really good run and they'll just feel super satisfied at the end of it. And if you do that in a multiplayer game, well, that doesn't work very well because one person just steamrolls the other like a turn or whatever, and then that other player's having a miserable experience.

[23:55] **Anthony:** So we don't have the equivalent of that because the computer does not feel miserable when you beat it. So it's a huge, huge advantage that single player games have. So we can allow for feeling of powerness. And an example of this in card games, there's this concept of an infinite combo chain off some cards in a way where you reach some infinite arbitrarily large value of damage or whatever it is that lets you win and then you win. Nah, no matter what.

[24:26] **Anthony:** So magic in other card games, they have those and they can be fun, but like I said, it doesn't feel good for the other player on the end of the infinite combo. In Slay the Spire we wanted to actually have infinites be a thing that was possible, because like I said, it just feels good when you get it off. But the big thing that we did was we tried to make it so it's hard to get those. So they're extra rewarding when you do get them. Because they're rare and they're hard to get, when you do get the Intranet Combo off and you beat the game as a result, you feel good about it because you worked hard to get to that point and it doesn't happen that often.

[25:02] **Henry:** Yeah, I really like that, that you can actually make overpowered cards but then if the chance of them is less than it still works, rather than just making all these cards that are very, I guess boring in a way.

[25:16] **Henry:** Do you think much about balancing new players and I guess experienced players?

[25:25] **Anthony:** Very, very much so. So one of the things we do in Slay the Spire is even early on is we took really detailed metrics on everything. And even even now, I mean, whenever somebody plays, they submit anonymous data to a metric server and we can see the win rates and how much they're picking certain cards, how much damage enemies are dealing, all kinds of things like that. And then one of the cool systems that we developed, because this is a hard question, especially for rogue legs, how much do you want? How hard do you want it to be for new players? Because if it's too easy so that the new players don't feel too bad then your veteran players could get bored. So one of the cool systems we developed is the ascension system, where once you beat Slay the Spire for the first time you'll unlock the ascension one, and that adds an extra layer of difficulty to the game. And then if you beat the game on ascension one, you unlock ascension two, and that adds even more difficulty to the game. And so as you go up, you slowly unlock all the way to ascension 20 where you add 20 different difficulty modifiers onto the game and it's significantly harder.

[26:35] **Anthony:** And so we create this kind of stratified difficulty where as you get better and better at the game, you're climbing the ascension ladder and the experience is always kind of matching the difficulty you want it to be at. And then in our metrics we can actually look at ascension levels. So I can say, Hey, let's look at ascension 20 players, how they're doing. And then I can go look at the no ascension players and see how they're doing. And then I can make sure that the win rates are where I want them for the different player groups.

[27:06] **Henry:** Yeah, that's really cool. I wonder how many games actually take as much metrics as you guys do.

[27:14] **Anthony:** I mean, there is a good amount of metrics use in the industry, less so in among Indies, I would say. Which is obviously I think a mistake. But I mean, there still are a lot of people that use metrics, but I think there are still plenty of games that probably could have benefited from more metric use. But yeah, it's been an invaluable tool for us in balancing the game.

[27:39] **Henry:** Yeah. Because I think about ... so one of the problems with open source software is that people are not okay with tools taking analytics data even if it's anonymized. And so most projects have no idea who's using them or how they're using it. And so you're kind of just lost unless you talk to people. And I think it's nice that other than the fact that we give analyzed data to websites all the time, but for some reason in software it's harder.

[28:08] **Anthony:** Yeah. Noe we do let people turn that off too if they don't. But yeah, that does seem like a problem, especially because with open source you'd have to have a central repository to store the metrics, and so I guess that's solvable, I guess.

[28:22] **Henry:** More of a cultural issue. But also in a way it's like doing in a way that people know that you're not trying to do something weird with it. Can you talk about your background because I know you ... I've listened to some interviews before and you said both of you, Casey and you were doing QA before, so I don't know, I guess that had a lot to do with this idea of being more test driven, which is a common thing in software. Right? Test driven development, stuff like that.

[28:49] **Anthony:** Definitely. I think it was a large impact actually, because yeah, so basically Casey and I, we met each other in college when we were studying Computer Science. And then at the time we made some small little hobbyist games. So we made a flash game and a little iPhone game. And they weren't any good, but they were just us figuring stuff out. And then we got our degrees and we went off into the industry. We stopped in the game thing for a while and we worked at different companies and we were QA staff, so we were doing QA stuff. And yeah, I learned a lot in doing that. And we just learned about the importance of actually doing testing and just things that are often overlooked I feel like. And also just user level things.

[29:44] **Anthony:** So we learned a lot from that. And then after that we left our jobs and started MegaCrit. And then me went off to make Slay the Spire. So that is our background. And I don't know that there's too much concrete examples, it's more of like a holistic thing. When you're actually doing QA all the time, you really learn a lot about things to avoid, especially when you're testing other people's crappy code. It was an interesting experience and I think it was definitely helpful.

[30:20] **Henry:** No, I mean, yeah, I think it gets back to some of the ... I mentioned Polanyi, and he has this concept of tacit knowledge that, a lot of the things we know we can't even express or we can't say. And so maybe it's just you were ... I mean, knowing that you guys were doing that for so many years, pick up on those skills and you apply them, and successfully in your next venture. I think it's really cool.

[30:45] **Henry:** Yeah, I guess I think it'd be cool to talk about, I guess, it's Steam Early Access, and then your experiences with that, and-

[30:54] **Anthony:** So, Steam Early Access is basically a way that you can launch your game in steam where you launch it basically before it's finished, you would say. And where the goal of Early Access is that the developer is going to keep working on it, pushing out updates, and get feedback from their players in theory, and then eventually they'll have their full launch out of Early Access, and then you'll say it's one data or whatever.

[31:23] **Henry:** So essentially it's like Beta then.

[31:26] **Anthony:** Yeah, yeah. I mean, basically it's a fancy way of saying ... almost, but it's more about ... I think there's some theory there that it's supposed to also emphasize community feedback. And so the thing with Early Access is that a lot of games go into Early Access and then they don't do it right. They'll have long periods of time in between updates, they won't use their community feedback that much, they will just use it like a Beta, like a short Beta or something. There's a lot of ways where ... because Early Access, it's not anything more than a way that you can launch into steam. It's on the developer and how they handle it. Right? It's just language to communicate to your player base essentially.

[32:12] **Anthony:** By saying, I'm in Early Access, it's just a way to communicate to your players, your intentions as a developer. And so what developers do when they're in Early Access is going to vary because there's no hard and fast rules. But to us, we wanted to have a very fast iteration cycle. That was something we hadn't development that we really liked. And we had play testers who were play testing our game throughout our development and we were giving them daily builds basically, and that really kept them engaged because things were just constantly changing. And if things are always changing, your players are less likely to be bored. So we knew we wanted to keep fast iteration cycles. So that was one thing. And the other thing is that we wanted to have a very, very strong communication loop between our player base and us. So we did a bunch of tooling for that. And I can go into that in a bit.

[33:17] **Anthony:** So we launched into Early Access after two and a half years of development and we did weekly updates, every Thursday we were pushing out a new update to players. And-

[33:28] **Henry:** That's a lot.

[33:29] **Anthony:** Yeah. It's a whole boy. I can go into that. So it was a ton, and in fact, we were actually pushing out more frequently than that because we actually created a Beta branch where we had a Beta branch in our main branch, and our Beta branch we would push out daily updates, and then after a week of daily updates in the Beta branch then we'd push into the main branch. So we were basically just constantly pushing stuff out to people. And how we framed it is, Hey, you can go into the Beta branch, the game's going to be buggy, or it's going to be less stable, but you'll help us out take the stuff out so that the releases will be more stable and then also you'll be on the bleeding edge. You'll be getting the content that might be changing the very next day. Because that's the thing that would happen.

[34:22] **Anthony:** So players thought that was really cool. And it was super, super intense for us because you just have this constant cycle of development, and we didn't have lives as a result, but our players loved it and it was really good for just constantly iterating quickly. And then we had that strong community interaction where we had our discord servers up and we were always in there and people could talk to us and we had bots set up that would collect feedback and bug reports and things and store them for us. So anyone could go into our discord server and say, "Bug, this stuff is terribly broken, fix It, please." And then we would keep track of all that in a tracker.

[35:08] **Anthony:** So anyone could just instantly provide feedback. And then we were also checking Reddit and other places and then just replying to people constantly. So we were always very visible to the community and we would always be fixing things. So someone could post on Reddit, a bad bug, and we could just reply. We would just would feel no issues just replying to them five minutes later and being like, Oh, hey, that's terrible. We'll push out a hot fix soon. And then we'd fix it.

[35:32] **Anthony:** And then we'd get a bunch of up votes and people would be really happy because it's really cool when you see a developer actually coming in and just answering your question and solving it. It's a really feel good moment and it makes our product better as a result. So it makes our community happier, it makes our product better, it's just kind of a win win all around except that it's ... So that's the only thing, is it consumes a lot of-

[36:02] **Henry:** Yeah, I think it's interesting even the name of this podcast, Maintainers Anonymous, I think what I was thinking is that a lot of times, for anything really, that people use things and have no idea who works on it. And being able to be involved like that is cool because then they actually know that you're a person, and you're this human behind the work.

[36:24] **Henry:** This is true in open source and any type of infrastructure, you become anonymous. Or the opposite is when you become really well known and then you become a celebrity but then they still don't treat you like a person. So it's interesting.

[36:43] **Henry:** Yeah I didn't finish this talk. There was a talk someone gave, it was called, Put your name on your game, or something. Because, Getting Over It by Bennett Foddy, I think that was really cool, because it was just saying how a lot of times for some reason it's just culturally you don't do it, and it's important for the success of future games in your career. So it's interesting that it's not as much of a thing.

[37:11] **Anthony:** Yeah. Actually I watched that talk and it was very wise. I think just being more personal with your player base is just a good thing. I mean, it was just one of the big takeaways from Slay the Spire. It was something that I knew I wanted because I like it when developers are more responsive, push updates more often, and are more real people and less like, here's hard, or corporate community person. This make you guys feel better and actually do anything. So it was something I knew would be good, or I suspect it I should say. But then after doing Slay the Spire now it's definitely a practice we plan to continue going forward because we saw the results and it was just nothing but positive. Although we might slow down our release cycle to maybe once every two weeks or something a bit more manageable.

[38:05] **Henry:** Because while you were saying all that, I'm just reminded of what I've done in Open Source and even the five minute thing. We would write ... so I'm making an issue when I get home, and then the creative project I worked on he knew all the code base so then he would just fix it immediately and do it within five minutes. No parole requests, just commit directly to master and then make a release. And I was like, oh, maybe I should do that. And then later it's like, well, I'm not that confident in my ability and it's a lot of work. And so I just feel it's a lot of ... just like looking back and learning like, yeah, that is really good, but then in the end you can't keep up.

[38:47] **Henry:** And I know obviously it's different with Open Source and making a game because we're giving away for free. So in some sense it's good to have goodwill but in the end we do all this work we're not getting paid for, and people are getting even more entitled because they're wondering why you didn't fix this thing.

[39:05] **Anthony:** Right. The incentives are different for sure.

[39:08] **Henry:** So it's hard because obviously you want to be able to fix as many bugs as possible and all the features, but in the end you have limited time and increasing amount of people using it without even you doing any marketing, which is weird because ... open source is funny because when you give it away more people will use it and the more users you have, it doesn't necessarily lead to anything more other than more work, which is so funny. So yeah, it's a different marketing and all that is very different from I guess your software.

[39:45] **Henry:** The community aspect, regardless of that is still the same of like, how do you interact with people? How do you stay positive? Should you even respond to every single thing?

[39:54] **Anthony:** Yeah. And I mean, certainly we don't respond to literally everything, but we respond to a huge chunk of it.

[40:02] **Henry:** Well, I guess then it's like, how both you or your team prioritize things? I think it's been hard for me after I left my job trying to figure out what to do and it's like we all want this freedom, but then someone in the back of your mind you're like, Oh it would be nice if someone just told me do this because that's the right thing.

[40:19] **Anthony:** So, yeah. I mean, yeah, because we did have big lists of features and things that were new content that we would always need to be working on. And it's more like we would just create a kind of a balance between bug fixes and content and features. And we would just try to always be working on a mix of them. Sometimes we'd have patches that were more about fixing bugs and sometimes we'd have patches that were more focused on just pushing out a big new feature or something. And it was just more of a, what do we feel like working on? What do we feel is particularly bad right now? Are things particularly buggy at the moment? Then we should probably slow down, fix a bunch of bugs. Did we want to really get out this new daily feature? Then okay, we're just going to focus on that. And maybe you only take care of a couple of bugs.

[41:16] **Anthony:** And then some of it is the severity of the issue. Right? So, obviously if you have the game crashing because of something that's going to be really high priority, and that's kind of a thing that you can just kind of internally figure out. I don't want to say intuition or common sense, but you can have a good feel for it. I mean, people prioritize bugs all the time and things like that. So we just make evaluations and judgments and then we just acted on them quickly.

[41:43] **Anthony:** And we're not having ... because we were just two people basically we didn't have a high friction on decisions. We don't even meet up in person, we're just talking on Discord basically. And we would just talk things through maybe once a day or whatever and say, Hey, these are the tasks we think are important and we just go and work on them.

[42:07] **Henry:** But you're both in Seattle though.

[42:08] **Anthony:** Yeah. We are both in Seattle. So sometimes we would meet, but on a day to day we're just working out of our houses.

[42:15] **Henry:** Right. So there's no office?

[42:16] **Anthony:** Yeah.

[42:17] **Henry:** Because that reminds me of Open Source because we're all distributed too.

[42:20] **Anthony:** And it's a good and a bad thing. So it's good because you can just get out of bed, start working and not have to worry about getting nicely dressed and commute, but it's also bad because you can get out of bed and just start working and then work until you go to bed. So it has its advantages and its disadvantages.

[42:45] **Henry:** Yup. I've been there for sure. I guess one thing I thought was really ... just listening to both of you talk, I guess I would use the word accessibility I think is really interesting thinking about this game. I think you've said before that strategy games are kind of inaccessible for people at times. And so it was a priority for you two to kind of make it easier to understand what's going on by watching it, so for streaming and also for learning. Can you talk more about that?

[43:18] **Anthony:** Yeah, sure. So, one of ... kind of our central theories was that how people find games these days is youtube and twitch. Right? It's how I would find my new games for the most part. I generally don't read press very much about games or reviews even, I watch people and then if I say, Hey, that game looks interesting, I'll go and play it. To me it seemed like we would really need to focus on that. We were no name Indies that never made anything that had really been listed anywhere before. We had zero marketing budget. So if we really needed to make something that would be engaging and hopefully it would work well on twitch, that was the thought. Especially because for our genre, the thinking was if we could get some Hearthstone or Magic Streamers to play the game, we could really build them off of that.

[44:14] **Anthony:** To do that, we really wanted to try to make the game very easy to visually understand what's going on. So, not hiding things and sub menu after sub menu, really displaying all of the information on the screen that's relevant, so that if you come in and you're watching you can see what's going on, see why the streamer's making the decision they're making, and also if you can understand whether they make mistakes and when they make good plays, that is really, really compelling.

[44:45] **Anthony:** Because sometimes I'll watch a streamer play some strategy game or something. I will have no clue what's going on. The streamer basically has to tell me. And then even when I do, or even when they do explain what's happening, you have no real concept of if they're making bad plays or not. And so you're just kind of less engaged with the experience. Whereas with Slate the Spire, you can see, Hey, the enemy is attacking for 27 damage. And I can see all the cards in the player's hand. And if the streamer makes a mistake, I can say, Hey, they screwed up. I can do better. And you can think, Hey I want to try playing this game. And it'll be a fun moment and you can say something and chat. Stuff like that. It kind of increases engagement and makes the player more interested in the game.

[45:39] **Anthony:** So that was a huge part of the thinking. And I think that's a very, very big component of our success because, like I said, we basically spent \$0 on marketing, but it was just been Twitch and YouTube sensation and that's how we've really, really spread.

[45:57] **Henry:** It makes sense because now people ... and this is maybe true in journalism and other fields where people follow these influencers, I suppose, instead of just going into news, then it makes sense to just find those people. And then of course if they're already playing similar games it might be easier for them to get involved.

[46:16] **Henry:** I like this idea that for accessibility ... making the game better for viewers actually makes it better for the actual people playing it too, which is really cool. And that also leads to more sales for you. So I think there's a wind wind on making your game more accessible is just better for everyone.

[46:34] **Anthony:** Yeah, exactly. And then also it helps you to just ... I mean, really you're just streamlining the game to be a better or more enjoyable experience. Sometimes some players definitely do like the super spreadsheety style of UI and things, but that's just not what I'm interested in.

[46:55] **Henry:** I know that there was an example of this happening with showing the intent of the, I guess monsters that you're fighting, and how that change over time.

[47:09] **Anthony:** Sure. So the intense system was something that was actually not in the original design. And that came more about of the thinking about Twitch and YouTube, and thinking like that. Originally, the monsters just did a random move. It kind of just felt too random. It was more like, I would say, a traditional JRPG combat, where if you think your little final fantasy characters fighting against some monster, it just has an AI, it doesn't move on its turn, and you'd have to learn or look it up, what they're going to do. We didn't like how it felt. So we went to the drawing board and we thought of a bunch of different ideas. We had several different systems along the way to the current intent system. And what we found was just displaying information to the player. It's not just good for streaming, but, like I said, it's made for more engaging, strategical experience because you have more information to work with, you can make a more informed decision, and it makes your choices more meaningful.

[48:13] **Anthony:** If you don't know how much damage the monster is going to do, then what you'll end up doing actually is you'll create dumber heuristics. So you'll be like, well, I'm just going to block for 10 and deal the rest that I can in damage I guess, but I don't know. Or you'll be like, well, I have no idea if the enemy is going to attack or not, so I guess I'll just always attack. These kind of ways of thinking. And those are less interesting than instead where you're like, okay, the enemy is going to hit for 15, how much do I actually want a block of that? Should I go all out or not? And when you have that information, it actually lets you think about it more and that's more interesting.

[48:56] **Henry:** Yeah. I think it almost feels ironic, giving more information is a good thing. Because normally I guess there's not that many games that do that, but it totally makes sense when you're playing. It's like, oh, I know exactly what they're going to do and now I can make an informed decision.

[49:12] **Anthony:** And actually the creators of FTL, which is a successful Indie game, they came out with Through the Breach. They came out with it a bit after us. And what was funny is that they had actually kind of came to a similar system where you can see what the enemy is going to do on it-

[49:29] **Henry:** Yeah, I played that as well. It definitely felt like trust kind of thing, where it's like, oh, there's pieces and you can see what they're going to do next to. Yeah. It's really cool.

[49:40] **Anthony:** Yeah. It's actually something I think will carry forward into our future games where displaying information and being open in a strategy game is I think an interesting thing that's probably underutilized with the current moment.

[49:52] **Henry:** Similar to that is, how do you create UI that doesn't ... UI that maybe there's too many things going on. So how do you kind of put information into places that makes sense versus just all these texts everywhere?

[50:08] **Anthony:** I mean, that's tough. So, one is simplifying and making your game more elegant, and then two is just iterating on it. I mean, really we iterated on our UI a ton. I mean, we went through constant changes to it, we had not only our internal play testing channels, but we would go out to local Seattle Indie events and have people play, and then we'd watch them with notebooks in hand, and we would do this just to look at how they were interacting with the UI and if they were able to understand things or not. And we'd think about like, hey, does this flash here need to be bigger so people can see it more? Stuff like that.

[50:49] **Anthony:** So, I mean, that's honestly, I think, just a very iterative process. There's not a good silver bullet. We can just say, Oh, do this and your problems will be solved. UI design is actually a huge component of good game design, I think, and it's actually underrated how important it is.

[51:08] **Henry:** Yeah. I mean, it's funny because I feel like in some ways the game UIs, even though I'm not, I guess all of them are that great. But it's similar in websites where a lot of times things don't make sense and it's just like everything gets more and more complicated and it doesn't really get simpler, it just becomes more hierarchical menu.

[51:32] **Anthony:** Yeah. And those can be problematic. I feel like if you think about the UI and the UX of the game, that's how the player is experiencing it. That's the interface through which the players are experiencing the game. So of course these are going to be vital because you're not watching a movie. So you are interfacing with the game so the way that you interface needs to be tight.

[51:56] **Henry:** Yeah. I guess it is interesting how people don't really think about it that much. This is similar in Opensource for those tools that you use normally, the way you get around it is like you write some documentation, you create tutorials, but in the end, if you had a simpler configuration or interface, then maybe none of those things are necessary or less necessary.

[52:20] **Anthony:** Yeah. Just read the manual. Yeah. Well, the thing is it's really hard to do correctly, right? It's a very nontrivial thing and sometimes I mean, ultimately I'm making a game. If you're making some very complicated piece of open source software, maybe it's not really a realistic thing to simplify.

[52:44] **Henry:** Yeah. All right. So it might be harder to integrate or it's just, you don't really see it that much, so maybe it's more like if more people do it then more people would think it's important. I don't know, it's hard to ... especially for more established project, this is true of anything, right? When you have a big company it feels like it's harder to innovate and try new things because you don't want to break things.

[53:08] **Anthony:** Definitely. I think being small is a huge advantage for innovation. The more I've interfaced with various large organizations in my life, the more I thought that that is definitely true. Especially in the gaming industry.

[53:25] **Henry:** I think it'd be interesting talking about even, what do you think of the future of where Oregon's viewing games can go, in terms of not just game play but also just how it affects society and where we're going? I know that that's kind of broad.

[53:40] **Anthony:** Honestly, I'm not sure. So in terms of how it affects society, meaningful change or something, I'd say that's kind of nebulous. It's more of an artsy kind of discussion than how ... Slay the Spire is not really that kind of a game, I don't think that's really the kind of game that I'll be making, but certainly there is art that can be made through games and that looks at serious topics in an interesting way. But I don't know. I don't think that that'll be ... ultimately it's going to be similar to any other kind of art in that sentence. So I don't know that it's going to create huge sweeping changes in society in that way or anything. Yeah.

[54:34] **Henry:** Well, yeah, I guess I didn't think it was huge changes. I guess it's more subtle that it becomes more of a normal thing then. I don't know, people think-

[54:46] **Anthony:** I mean, I kind of feel like games are already that normal thing. For my generation, I assume your generation too, I imagine you're about my age. So for our generation and the generation under us, it's probably ... at least for people in developed countries, it's probably more likely that you have played video games than that you have not. And I think that trend is only going up. It's weird if you don't watch TV or haven't watched TV at some point, or Netflix. And the same, I think video games are basically at that level. They're mainstream in a way that they weren't in the past, and I don't think they're going to lose that mainstreamness. Everyone knows what Fortnite is.

[55:33] **Henry:** Yeah. I was going to bring that up. Yeah.

[55:36] **Anthony:** It's not just like a thing that the nerds in school did and the bullies pick on them. That's old. That's way in the past now.

[55:43] **Henry:** Awesome. Well, thanks for joining me today, Anthony. If people want to reach out, how can they find you or if they want to get the game?

[55:49] **Anthony:** Sure. So our websites that MegaCrit.com or on steam under Slay the Spire. We're on Nintendo switch and PS4 now, we will be maybe coming to Mopa later this year. So yeah, we're out there and we're going to keep working on Slay the Spire and then eventually come up with more stuff. But yeah, thanks for listening everyone.

[56:12] **Anthony:** Thanks for listening. Check out our website, maintainersanonymous.com for show notes and transcripts. If you have any feedback, ideas or guest suggestions, you can reach me on Twitter @left_pat. If you'd like to support the show, you can visit patrion.com/henryzhu.
