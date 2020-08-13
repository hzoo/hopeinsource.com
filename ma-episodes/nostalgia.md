---
title: "13: Jordan Scales on Nostalgia and Not Taking Yourself Too Seriously"
date: "2020-05-26"
time: "76"
description: "Why attempt to faithfully recreate the past? Jordan Scales joins Henry to chat about design systems, being pixel perfect, accessibility, the Microsoft Windows User Experience reference manual, using VMs, MSPaint and Figma, whimsy and having fun with coding, creating satire at no one's expense, and even how Babel's Guy Fieri meme could of been Jeff Goldblum in another universe."
episodeLink: 8b00cb5a
embedUrl: https://share.transistor.fm/s/e7a1abae
---

### Transcript

<details>
<summary>Mentions

> Conversations may be edited for clarity. [(edit)](https://github.com/hzoo/hopeinsource.com/edit/master/ma-episodes/nostalgia.md)

</summary>

- [98.css](https://jdan.github.io/98.css/)
- [Jordan's 98.css Blog Post](https://thatjdanisso.cool/98-dot-css)
- [Microsoft Windows User Experience Reference Manual](https://www.amazon.com/Microsoft-Windows-Experience-Professional-Editions/dp/0735605661)

</details>

[00:00:00] **Jordan**: Hello, and welcome to Maintainers Anonymous. This is your guest Jordan Scales. Henry graciously allowed me to do the introduction. This is a podcast about software maintenance and anonymization. Henry, I don't know if that's correct.

[00:00:13] **Henry**: That's a funny one, actually. I guess that's one way of putting it, but it was more trying to think about software maintenance on how it relates to other kinds of maintenance.

[00:00:22] **Jordan**: Interesting.

[00:00:23] **Henry**: The anonymous part is just a pun, or a play on words on Alcoholics Anonymous.

[00:00:28] **Jordan**: Okay, interesting. Sure. This is like a support group for maintainers. Yeah. I'm into it.

[00:00:34] **Henry**: And this is a good intro, segue. You are sort of a maintainer now, because of this project that you just released a few weeks ago, right? Or really recently.

[00:00:43] **Jordan**: Yeah, two weeks ago. So I released a thing called 98.css. It is a quote, unquote design system. It's a single css file, so it is somewhat unfair of me to call it a design system, but that's what I call it. For making applications that look Windows 98, is essentially the tagline. It is a celebration, if you will, of retro computing. I was born in the early '90s. So I grew up playing games on Windows 98. Really, my first time on the computer was Windows 98. When I was a we, little one, and then doing typing class in elementary school and all that thing, all happened on Windows 98. So I know the buttons, the colors, the shadows, the text very well.

[00:01:36] **Jordan**: And there's a bit of nostalgia that just hits me when I see it. And this is an idea that's been floating around for a really long time. I'm not the first one to do this, I guess first off I should qualify that. There is a 95.css, and there's also a ... Goodness, I'm forgetting the name. I think it might literally be called Windows98.css by Contra. It's the guy that made Gulp all those years ago. And yeah, but one thing, and I'm starting to rant a little, but one thing that always tripped me up was it was close, but never exact. And in my career, I am a software developer at Stripe. I write mostly front end code.

[00:02:16] **Jordan**: So, I interact with designs all the time. Component libraries. And prior to that, I used to work at Khan Academy and Medium. And in all those places, one thing that, in my career, I've been really obsessed with, is pixel perfect. So when a designer gives me something, I want to make it look the designer wants it. Sometimes it's a bad idea. Sometimes the designer gives me things that are not good and don't work. Don't scale well across different browser resolutions and all that stuff.

**Jordan**: And sometimes I spend more than I should making it pixel perfect, when in reality, should be rethinking the approach. Gotten better at that, but nevertheless, pixel perfect is a creative exercise for me. And beyond nostalgia, the other driving force for this project is making a pixel perfect representation of what Windows 98 looks like. So this was an exercise in firing up a VM, installing Visual Basic four, making a UI with buttons, text boxes, scroll bars, and taking screenshots and measuring it. And bringing that in Paint, not just the colors, but also the spacing between various UI elements.

**Jordan**: A very long way of me saying that all these libraries did one thing that really bothered me, which was Windows 98 buttons have this shadow. They would look chiseled stone. And the light comes from the top left. So the left side has a shade of gray, the top has a slightly different shade of gray and the right and the bottom have slightly different shades of gray. And a lot of people do this with border left color, border top color, border right color, border bottom color. What happens when you do that is you get 45 degree angles on the button. Now, Windows 98 didn't have 45 degree angles because it was literally a pixel. So if you actually take a screenshot and you actually zoom in, you notice it's little staircase pattern that has an outer border and an inset border.

**Jordan**: And no library, I don't want to say no. The popular ones that came before or whatever, didn't do this. And it always bothered me because it looks it's so close, right? You see a picture, "Whoa, it's Windows 98. This guy made Minesweeper." But you have 100 buttons because each mine, it's a 10 by 10 grid, has these channels that aren't right. And it's , oh my god. So that always bothered me. As a academic exercise maybe about two years ago, I made a code pen that used border top color as well as a box shadow to get the pixel perfect staircase look. It was really fun. I mean, I literally spent ... It was probably two hours of me in code pen building something that, as a result, was probably 200 pixels by 40 pixels tall, which is a lot, right? If you do the time per pixel, output is not very high.

**Henry**: Interesting measure of efficiency.

**Jordan**: Yeah, pixels per minute. And it was super fun, right? And that idea stuck with me as; can I make a thing out of this? I don't want to say I've been working on it for two years, that's an absolute lie. I've been working on this thing for maybe two weeks or three weeks now. Because I actually sat down to do it as a little side project, and had an absolute blast. I think primary driving force, like I said, it's nostalgia. It's also a creative exercise in being pixel perfect. Both of those things put a smile on my face. You load up the site and it's just funny, in a way. I don't know, a lot of people that are listening to this probably don't know who I am, but I do funny things on Twitter. I like making people laugh, I like making people smile.

**Henry**: You make me laugh.

**Jordan**: Thank you. We may talk about the Guy Fieri thing later.

**Henry**: Good foreshadowing.

**Jordan**: Right, right. I wrote a blog post that suggests that there's a picture of Guy Fieri within Babel source code that went-

**Henry**: Just a lot of satire before, right?

**Jordan**: Yeah, I'm super into the satire game. It is sort of a shtick that is, I would literally say stolen from Jenn Schiffer. I was very, very into Jenn Schiffer's old writing when I was in college. Oh goodness, I'm forgetting the name of the collection. Something.css. Yeah. But anyway, a Medium collection of her and her colleague at the time when she was at MBA used to write these very funny media posts that were so funny. And I wanted to do that really bad and because I'm a man, I just copy someone else's work, slap my name on it, and that's it. And that's how, unfortunately, fortune works. Yeah. I mean, we can talk later when we talk about satire and all of this. I have many feels about why I don't really do it that much anymore. Some of that stuff.

**Henry**: Yeah, you kind of changed.

**Jordan**: Yeah. But yeah. Anyway, so this library is fun. It's funny, it makes you smile. It's not serious. No critical infrastructure depends on it. So I kind of just do whatever I want.

**Henry**: Not yet.

**Jordan**: Not yet.

**Henry**: You might want to get into that.

**Jordan**: Oh God. Yeah. You're going to make me terrified.

**Henry**: Oh yeah, I don't want to scare you, but it is interesting to see. Actually, a few people have asked me about that recently. They do their project, maybe it's not even open source. And so now they want to see if they want to make it open source, but they hear all the horror stories of maintenance and they're like, what should I do? It's hard.

**Jordan**: My degree of maintenance so far has been twofold. People come in and they file an issue. I don't want to say how many categories. Couple people write in like, "Ha ha, wouldn't it be cool if you did OSX.css?" And I'm like-

**Henry**: That's a whole different scope.

**Jordan**: Yeah. Why did you file this issue? But sure, sounds good. Close that one, stay out of scope. Other people write in and say, "Hey, you're missing drop downs". And I'm like, sweet, yeah. Sounds good. Let's put a label on that bad boy. Other people write in and say ... Probably the most fascinating one, and this one, maybe I'll spend a little bit of time on, is; I'm finding ... So this library, put this on the Twitter, got some traction, put on Hacker News, got some traction, which I don't like. But the Hacker News comments were really good this time around, which was very nice. Kind of fits into the old cranky style of, "Oh, everything was better back then". Which is part of the library. So a lot of people are like, "Oh, I feel so much nostalgia because the modern web, the flat design sucks". So anyway, I tracked a lot of old beards that are super into this stuff. And one guy that filed a bunch of issues, he runs a site that talks about old GUIs and it has screenshots of these old GUIs.

**Jordan**: And it has OS2, Windows NT, Windows 98, Windows 95, Windows 3, fascinating stuff. And he has given me these detailed issues that are like, "Oh, just so you know, the window text, when you have this type in the title bar is off by these pixels. Here's a before and after screenshot". And I'm like, oh my God, I had no idea there were other people that cared about this stuff. And those are fascinating to me. I go in to fix them. It is interesting because I fix it and I feel good, but no one really notices, because it's kind of pixels.

**Henry**: Right. I was actually going to say about that. I mean, this is all open source stuff. There's no change log. It would be good ... I mean, you can obviously update it on the website so people will see new features, but then most people see it once, they'll be like, "Oh, that was cool, but then bye". But not actually use it, right?

**Jordan**: Right. 100%. You can go on the used by on GitHub and see a couple of people are making games or personal websites with it. And they don't really care if the button shadow color changes. It's not going to affect them. But one thing to keep in mind is; I do get these PRs, so I'll splinter this one out as well. I'll get these PRs that are like, "Hey, I added a tab menu or a tab panel". List of tabs, which the web platform does not provide. You have to build it yourself. And they'll do it in CSS because it's the CSS library. There's no JavaScript. However, you can't do it with CSS. I mean, you can, but you got to use checkboxes and after tags and there's no Aria labels on it. It's not accessible. You can't use it with a keyboard. A screen reader's just going to throw up.

**Jordan**: It's not going to not going to work at all. So for me to build a tab panel means I have to do something stateless where, if you want to show it a list of tabs, the CSS selector will probably be like, role equals tab list. And then on the list of tabs, the active one is not going to be hidden checkbox.focus. It's going to be Aria selected, which is how you build a tab panel that is compatible with a screen reader. And you have to do it stateless. So you got to use the selectors that way. And that's an annoying thing to get right. I have an outstanding issue that I'm working with a very patient developer that is going through the ropes and that's been the hardest one so far. Has been getting that PR in a really good shape because first they did it with hidden checkboxes. Again, can't do it.

**Jordan**: Then I wrote out in detail why they'll they'll have to do it a certain way. They came back and did it pretty good. It wasn't perfect. And I outlined the exit criteria to be like, "Hey, reach UI, which is Ryan Florence's thing. Reach UI has tap handle library tie, I'm sorry, tap handle component. What if you rendered a tab panel and you put 98.css, and it just worked?" So basically, Ryan's markup is now correct because that's been verified. He works with Marcy Sutton who is a phenomenal accessibility developer. I've been a contemporary of hers for a number of years, ever since I did accessibility work back at Khan Academy. Smartest person ever. I think she's at Gatsby now doing accessibility stuff, and super bright. So she works for Ryan a lot of these things, and that's the exit criteria.

**Jordan**: He's like, "Hey, if this works, then I'm going to hall march this bad boy. But that's a time consuming process. And once it's good to go, I'm going to add it to the docs. But it's annoying to use, right? You have to provide your own tab panel to use this thing. It's not nearly as cool as, "Hey, I'm going to take a text box and I'm going to make it look like Windows 98". So, some of those things aren't as interesting to me, those sorts of problems with adding these components, like a dropdown menu. Not super interested in it, but I think it sounds ... Doesn't sound like scope creep. It should probably be in Windows 98.css. It should be able to render them, but yeah, those issues come in and they're tough.

**Jordan**: Someone else gave me a start menu component, and it's the same thing. It's like, I can't do this with focus because that's not how start menu works. You're not going to be able to use with the keyboard. And that's frustrating to tell somebody. How do you outline that to say, "Listen, before you put in a couple hours to make this fun thing, I'm not going to put it in the library because it's not accessible". I have that as one of the core tenets of the product, but how do you put unit tests for something like that, right? You can't.

**Henry**: I don't think you would, you would have to review.

**Jordan**: Yeah, you got to review it, and it'd be like, "Hey, I'm not going to put this in, thanks for all your work."

**Henry**: I think that if you bring that upfront, that's very important to this library. I don't know if it needs to be in the template for the PR when they make it. They know that it's there or even in the description, honestly, at this point. Might as well just mention that up front so people know. Yeah. I think that's interesting around what are your goals and how do they relate to theirs? And they assume certain things like, "Oh, you just want it to look like that". But you're like, "No, on a fundamental level, yeah, it has to be accessible."

**Jordan**: Has to be the same. Windows 98 is so accessible. Both from an assistant device perspective, being able to use the keyboard really effectively, being able to use the mouse effectively, which was a new thing at the time. And also from a visual point of view. There was a reporter DM me on Twitter. He worked for ... Is it The Intercept, I want to say? This is bad that I'm not remembering. He wrote an article about me, and one of the quotes in there is, "I've literally watched my mom on her iPhone use Instagram. And she doesn't know if certain things are buttons because they're just blue text". They look like text. And I've literally said to her, "Oh, you have to tap that, you have to click that". And it's weird that it doesn't look like a button, right?

**Jordan**: How did we lose that sort of thing? Whereas Windows 98, it looks like a goddamned button. It's this chiseled piece of stone with drop shadows. So I can't make a Windows 98 that's not accessible. I can't do it. That would be disgusting of me. Morally, I have an accessibility background. I built a thing called Totally when I was at Khan Academy, it's an accessibility toolbar checker type thing.

**Henry**: And you also made ... What was the another one? The other tool, the Mac ...

**Jordan**: Oh, I had a contrast color picker for a bit. That's not on the Mac App Store anymore. That was an electron app fax. You could pick two colors and it would not only tell you the contrast ratio, but it would also suggest what shade of blue you should use. So you put in a blue on white, it tells you it's not accessible. It's got a contract ratio of 2.7 instead of the 3.0. Here's the shade of blue you should use to get 3.0, which was provided source code by Google. This is Alice, she goes by @sundress on Twitter. Alice Boxhall. One of my other favorite accessibility people. They're all amazing. I don't know. You'll probably hear me rave about them during our conversation. But Alice is so smart. She's been at Google forever. She does accessibility in dev tools, bunch of brilliant features. One of the features in there is suggesting the colors. So she does this unbelievable linear algebra to ... You draw the plane that crosses the RGB at the right place in the color cube. And then you traverse that cube, the edges of the cube until you have a shade of blue or shade of green that is accessible.

**Jordan**: So anyway, I used her math, but I thought that was a killer feature of the thing. Turned out, it wasn't. It is good, but that's not how you get people to buy your $5 color picker. So when Catalina came out, it broke my electron app, and I couldn't fix it. I spent like, six hours, and I couldn't fix it. And I was like, cool. I've well exceeded the margins here. The return on investment of my time, the thing was making maybe $20 a month, which is a fun thing, right? When someone buys your software, it's like, "Whoa, cool, someone gave me money". But at a certain point, I'm like, I'm not going to be able to fix this thing. I don't want to rewrite it. So I recommended Sam Soffes and @mds have usecontrast.com. They have a phenomenal color picker, really well designed, works.

**Jordan**: It's native, it's not electronic. So it feels really good. It looks really good. Doesn't suggest a shade of blue that you should use. So they don't have my killer feature, but they outsold me because they're both better developers than I make a better product. So anyway, yeah, I'm into accessibility. I could not make an inaccessible Windows 98, especially CSS thing. If people are going to be using this thing, and I've gotten PRS of, "Oh, I need my so and so to look like a button, so here's a thing that inserts and is button class name". So I'll get the button styles for my divs. And I'm like, "Absolutely fucking not, I'm not going to allow that". I understand the extremes of the Gmail interface is built with divs, and it's perfectly keyboard accessible. They also spend literally hundreds of millions of dollars building that interface. So well, hundreds of millions is a lot. I guess over the timeline of Google, it's probably about right. But anyway, millions of dollars a year on Google's interface, Gmail's interface, sorry, so they can make buttons out of divs, but you cannot.

**Henry**: I guess it got me thinking that this would be a great library or project to just talk about accessibility then. If you want it to be almost an educational tool, this is fine. People, like you were saying, when they see the site for the first time, they already know what it's about. You don't have to read it, really. But then when they look into it, they want to contribute. You can be like, "Hey, this is important to me, and it should be important to you too. And this is one way for you to get into learning some of this stuff". And how to make it easier.

**Jordan**: Happening a little bit in the PR comments of the tab panels and the drop down menu, but yeah. If I get more contributors and I make the experience really nice and really fun, yeah. Totally spread the word more. I'm thinking of it from the other end of in order to use my frigging library, your interface has to be accessible, which is not teachable. That's enforceable. It's like tax code versus teaching people to do the right thing. I should be able to do both.

**Henry**: Yeah. Because I know you wrote a blog post about making it and everything, and at the end, you don't really care if no one uses it. You just want to do it for fun. But if it does get some traction, then, I mean, it seems like you are looking at emerging PRs, and people are contributing. So it's not that it needs to be an official thing or anything. It's just it is more than maybe what you thought, initially.

**Jordan**: Yeah. No, that's a really good point. Yeah. It's been fun. The PR process has been fun. It's been fun for a couple of reasons. One of them is that it's just nice to be on GitHub again. I mean, it's been a while. I did a lot of open source when I was in college. I had all this free time doing internships and stuff. I like to think it helped, but this was at the time where a lot of people were like, "Oh, the GitHub portfolio is not a good idea", and

**Jordan**: And it's not, but anyway, I had a good one. And I had a lot of fun building a couple of things you see here, your star counts. I've gotten desensitized to be honest. 98.css has 4400 stars, which is a lot.

**Henry**: That's a lot, yeah.

**Jordan**: But I've been down this road. I live a little slideshow library to this, I had a isometric web canvas library, did this on Hacker News on Reddit. I kind of know what happens. And the thrill of it has not been, "Look how many people are looking at my thing," it's been more like, "Look at the nice things people are saying about it." Which is different for me.

**Jordan**: I used to sort of, I'll give you an example, when I wrote my sideshow library, I cared very deeply about the code quality. And if people saw it, it was like, "Cool. I wrote really good code. And so many people saw it and starred it. That means I'm awesome."

**Jordan**: Now, it sort of follows my personality, my career, which is that like, the code for 98.css, it's not good. There are a couple of build scripts in there that are disgusting. They work and I'm really proud of them because they work. And I'm more proud of the fact that I got this thing up and running and people are like talking about how cool it is, rather than just looking at it and My code is good, therefore, I'm a good developer. Now it's people are saying nice things about this thing that I put out in the world, therefore I did the right thing.

**Jordan**: So it's shifted, right? It used to be a code-quality thing. I really don't care about code quality. And you know, we could talk about this too-

**Henry**: Yeah we should yeah.

**Jordan**: As part of it, it's just not a thing I really care about. It's prettier, looks great, but people will give me PRs that they don't have prettier. I'm not limiting the source code. And I get review comments. People like, "Oh, just so you know... "

**Jordan**: I'll give you an example. Someone put a CSS rule where it was like selector, curly brace, properties end curly brace, all on the same line. It's just one property.

**Jordan**: And someone wrote in, and was like, "Just so you know, this is not the sort of standard formatting that this library uses." This was not me. This was like a random try hard. Literally code reviewed somebody.

**Jordan**: And I don't want to call them out. Right? But I don't remember their username, because it's not important, but I don't think that behavior is cool. That's mean to do that, but I don't care.

**Henry**: Yeah.

**Jordan**: So like, if your rule's on the same line, I don't care. It's not important to me. If I hit save next time I'm editing it, and Prettier decides that it should be on a separate line. Great. I'm just going to commit it. I'm not going to like freak out because it's not perfectly matching my thing. I'm sort of a nihilist when it comes to that.

**Henry**: No. I feel that way too. Especially that kind of stuff, you can just when you're committing, you could add another committing yourself that formats it, or you could run it on CI or whatever. There's so many ways to like get around the fact that they didn't know that it was needed. And maybe the other person was well meaning, like they said that.

**Jordan**: They absolutely were. They want the code quality to match and they think that that's important to me. They're trying to represent me.

**Jordan**: It's not. And I don't know.

**Jordan**: I think there's a threshold. Like I think Babel source code should probably look pretty similar. Would you go across files? Maybe it's easier to reverse. I don't know. I don't contribute to Babel. I removed Guy Fieri, but that's it.

**Henry**: Yeah. You had a contribution.

**Jordan**: I did have a contribution. It was pinned to my profile for a while.

**Henry**: We use prettier too. I think over time, the things that you care about changes. And maybe what you're trying to go for is it's not really that, how many people are actually going to look at the code versus you're showing them usually the site itself with the style, like the design Or the styles itself, not the source code. They're probably looking at that anyway. So no one really cares if the code is not that great.

**Jordan**: Yeah. Right.

**Jordan**: I think another half of it is that I don't know what clean CSS looks like. People have tried really hard and you know, this is another entire podcast episode. I used to be super into CSS and JS. I'm not so much anymore because Stripe has a literally world-class component library.

**Jordan**: I don't write CSS in my day job anymore. I just use the components like-

**Henry**: That's great.

**Jordan**: The designer has these tools that give me a list, with text fields and buttons. And if I use the list component with the text fields component and the button component, it's going to be pixel perfect. I don't have to use the right class name. I just use the button component. So I don't write CSS. I don't have any opinions on CSS anymore. But I don't know how to write good CSS. I don't know.

**Jordan**: Is it even a skill I want to develop, I don't think it is. I think it's important in certain circumstances. It's not important for 98.css. It's important at Stripe in the sense of like the people writing the CSS for the textlist component or the textinput component and the button component. Maybe that CSS should look pretty frigging good. But for me, I don't really concern myself with it. So I think it's honestly arrogant for me to say like, "Your CSS doesn't look like mine, therefore I'm not going to accept your contribution." Because I don't know what that CSS is. Should I alphabetize them? Probably not. You could argue that maybe you should. You could argue that you want to have them, there's that four letter acronym of like position and colors should be in separate sections. Do you want to abide by that?

**Jordan**: I don't care. If I really cared, I would just put like an automatic thing in there. Kind of like Prettier, right? I don't really care what clean JavaScript looks like. Clean formatted JavaScript. So just whatever Prettier does is good for me. I'm a big, big proponent of code formatting. I'm getting off topic.

**Jordan**: But yeah. All that to say that I care way more about this person that is enthusiastically giving me source code for a library. I want to get that merged. It's cool. And if they're giving me a tree view component, let's just get it out. It looks fine. The code's fine. The semantics are fine. It's accessible. That's all I care about, right? I don't really care if their CSS looks like mine.

**Henry**: Yeah. And right now it's just a single file. So maybe it's easier to be like, Does it really matter? And you're like "All right, let's do it."

**Jordan**: Yeah. A hundred percent.

**Henry**: And also, if this is more of a niche thing, then the people that are willing to contribute are a lot more enthusiastic than maybe other people in different projects, possibly. Especially if this has to do with lists aesthetics and-

**Jordan**: Yeah. I'd like to think so.

**Jordan**: Another thing that has been interesting is so I haven't given any one contributor access apart from Mu-An. So Mu-An is at GitHub, she's an also awesome sort of person. I'm sure you met her at BoroJS events. Also an awesome accessibility person. And she talks about a lot about spans to HTML. It's very important to my project.

**Jordan**: She, how was I getting... Wait, hold on. Sorry. Oh yeah. She is a contributor. I have another friend of mine that's contributor. But in my other projects, like when people give me PRs for Cleaver, which is my presentation framework has like 4,000 stars. I don't think it's used by that many people though. Sort of tried by star. But anyway, somebody gives me a good PR. I'd really look at it for like a split second and then I'll look at their profile, make sure they're not like a spammer. And then I'll just give them PR access.

**Jordan**: Or I'm sorry, commit access. So I'll literally add them to collaborator and be like, cool. You're in. Then merge your own thing. And I've tweeted about this. This is a piece of advice I got from John Resig. So I used to work in the Khan Academy. I am sorry. I'm namedropping so much of the episode. These are all nice people. I'm not saying that they're like, I'm cool because I know them. They're just really nice people you should know get to know them.

**Jordan**: Anyway, John used to like mentor me a bit. We worked on accessibility stuff together. And one of the pieces of advice he gave you was like, "These people that enthusiastically view source code, a lot of times magical things will happen when you just give them commit access." So this is a library that I'm not going to touch again. And this person is, so let's just see what happens.

**Jordan**: Worst case scenario, well, I guess worst, worst case scenario they spyware my library. So let's make sure they don't do that. If my library is not super important, whatever. But worst case scenario, they don't do anything so I can give the commit access, the emerge their own PR. Then they walk away. Great. That's the same as where we were in the initial state.

**Jordan**: But what usually happens, and it's always fascinating to me, is that they'll start like grooming issues and grooming other people's PRs. It's fascinating to me. I have a Python library from when I was 19. It generates sine waves and like square waves and stuff. So you can write like sheet music and it will (singing) in Python. It's an awful, awful library. Very slow. It doesn't do anything. Anyway, someone gave me PR, I was like, cool, "Here you go."

**Jordan**: And then they like redid everything. They're like, "Oh cool. You know, the way that you do octaves is wrong. I have a music degree." I'm like, "Cool. I don't, so that's great. Let's go with your code." And they fix everything. They go to old issues. They close them out. People can be PRs. They review them. It's phenomenal. This is just someone who gave me a drive by PR, that was probably like, "I fixed the typo in your docs." And I gave them commit access and magical things happened.

**Jordan**: So all that to say I have not done that yet with an idea that 98.css. I still am interested in shaping it a little bit. Figuring out like, Where's this library live? How can I set this up for success when it comes to accessibility, when it comes to contributing a JavaScript style components? Once it's at that point, I'll probably be super, super, super liberal with just giving people all the access. But for now I'm very liberal with just merging PRs. Anyway listening, give me a PR I'll merge it. You can put spyware in it if you want.

**Henry**: No, it makes sense.

**Henry**: I think in the beginning, it's almost like you're still figuring out what you think this project is and you don't know the scope and stuff like that. And eventually you're kind of okay with what people... Or no, I think you put enough things in place so that it's natural for people to follow what your mental model on this project is, essentially. And it's almost like you don't even have to tell them, "Oh, this is about accessibility," or whatever it is, people will follow it. And I think that it's true in the source code, and the docs, and in how you act as a maintainer.

**Henry**: I was even just trying to look through the project and stuff, and so even I was looking at some of the examples on the site for how to use certain things. I saw it would say, they had like the Bon Appétit members in one of the examples, I was like, that's cool.

**Jordan**: Bon Appétit Test Kitchen. Shoutout to Claire!

**Henry**: And a lot of funny stuff in there. I saw you had cow bell and then you could do the volume slider up and down. So I guess I've seen more or less cow bell. I don't know.

**Jordan**: Oh wait, that's funny you say that. I didn't write the docs for that, a contributor did. Did I not even read it? Hold on. I'm loading it up now on slider.

**Henry**: So I guess it's more like once something see's something. People will kind of follow up on it. So it's cool.

**Jordan**: I'm not kidding. This is not a plan. I did not know the cow bell was there. And maybe I should because I'm a maintainer but

**Henry**: I figured you wouldn't know one of them because I was like, first, I thought you did it. And I was looking through the PRs. I was like, Oh, they're doing these things.

**Jordan**: Oh, that's so great.

**Jordan**: Thank you for telling me about that. I didn't know. But yeah, you're so right. Setting the stage of like have fun with this damn thing. Library makes it look like windows 98. Don't take yourself seriously. It's fun. Make sure it works. That's it. That's all I care about.

**Jordan**: I don't know. I'm into it. I don't know what the end state is. Part of me, I'm such an nihilist with this stuff, part of me is like, cool projects done. Looks like Windows 98, right? I'm done with it.

**Jordan**: Another part of me is, excuse me, let's put out a couple of components. See what happens. Third part of me is like, let's just wait for people to build stuff with it. The reality is that a lot of those things just aren't going to happen.

**Jordan**: Maybe no one's ever going to use this for their personal site. I didn't really build it for myself to use. I didn't have a use case in mind when I built this, which is an interesting point of view. That's the complete opposite from all my other open source projects. This is just literally something fun I want to make.

**Jordan**: And I don't know what that means for the quote unquote, health of the library. If you want to determine health as like, how fresh is this thing going to stay? It's possible that no commits will ever be added again. There's a possibility that the library is going to sit there for two years.

**Jordan**: And I don't think there's any visual bugs in it. I'm so arrogant to be saying, it's so small in scope, I've measured. It looks like Windows 98. And I don't think anyone's going to be complaining on Twitter like people have been about a dedent JavaScript library being like, Oh, this is used by 4 million people a month, but it has this old bug library's not maintained for two years. I'm so pissed off right now.

**Jordan**: That's not going to happen for Windows 98. So is it fair to say that Windows 98 might die? I don't know. Maybe it's immortal because it's just going to always exist. It's always going to look like Windows 98.

**Henry**: I think that's a good question to think about, what you're saying. What does it mean for a project to be healthy? There's so many aspects of that. I think we tend to think of healthy as relevance instead of I, and from the maintainer point of view, I think of the maintainer health of like, who is working on it. Are they not being burnt out that kind of thing? Or you can talk about the code and whether it even works still, is it doing what it's supposed to do? And then also just what you were saying earlier about, where is it going? Does it have a vision? But not every project needs, something like that.

**Jordan**: Yeah. It's funny. I don't know if I'm taking it seriously enough.

**Henry**: Which is funny.

**Jordan**: Is it done? It looks like Windows 98. Blah, blah, blah. Maintenance, what's that even going to look like? How do you maintain something that feasibly the button borders should look like they do now in five years? Just because the way CSS works.

**Henry**: Good question.

**Jordan**: Here's the thing. I am not, there's a couple parts of it where I am addressing browser bugs or browser discrepancies. Those will definitely probably break spectacularly. The way that we render check boxes on mobile Safari requires us to add another property. And is it possible that in five years, safari will catch up, mobile's safari will catch up that property will it break something else? I guess it's possible.

**Jordan**: And at that point, someone files a bug, is anyone going to want to fix it? That would be nice. How do I ensure that that's the case? I don't know. If I make it fun and an interesting place to contribute. I don't know.

**Jordan**: A lot of people talk about how there's just this wall of even though they have a one line change for library, they don't want to go through the hoops. So what if those switches did exist for 98.css? What if I, two years from now, had six people that I've added as contributors because they've given me PRs and someone writes in says, "Hey, this checkbox bug is happening again." And then they just merge it. That would be, I think, successful for me.

**Henry**: Another thing I wanted to bring up was you mentioned pixel perfect and sort of this weird uncanny valley of you know what it should look like, and then someone else did it. So like kind of right. What do we call it? Almost like anti-aliasing, by doing the 45 degree.

**Jordan**: Yes. Absolutely.

**Henry**: And so you mentioned that you basically bought the Window reference manual to check this stuff.

**Jordan**: Yes. I bought it. Oh man. I don't want to say it's a year ago. Probably almost a year ago though. It was very cheap on Amazon, I got it used. Probably like 10 bucks. Huge, like 500 pages, big book. And I completely left this app before, but when I was first looking into the sort of staircase shadow, it turns out this is documented behavior. This is snaked out behavior from the Windows user experience guidelines.

**Jordan**: It's fascinating to me. You literally open the book, you go to page 170. I have quotes in there on the docs.

**Henry**: I thought that was cool to put in.

**Jordan**: Yeah. It kind of made for a cute little introduction of what did an input box? How was that described to the nineties. It's an input for entering text, anyway.

**Jordan**: Yeah. So this book, I grabbed a copy of it because I found a digital version that had literally a picture of what that staircase pattern looks like on the shadows. And I was like, Oh my God, I have to immediately own this.

**Jordan**: So I bought it and I did reference it. It's referencing my variable names in terms of, I'm calling it button highlight color, button shadow color, and there's things in there of what should I call it? So I call something, just let me open up the docs, but the names I give to these things do correspond with what they're called. So for instance, option button, instead of radio button. It's called an option button. In the docs, it mentions why I've called radio. I didn't know this little fun fact. On old school radios, you might know this already, but you can only hit one of the buttons at once.

**Jordan**: So if you hit like play and then you hit fast forward, the play button pops up again.

**Henry**: Right.

**Jordan**: So that's why it's called a radio button. Because you can only have one of these things.

**Henry**: That makes sense.

**Jordan**: But in the Windows docs it's called an option button.

**Jordan**: Now to use option button, you don't have to remember that it's called an option button, you just have to render radio buttons, semantically. So input type equals radio.

**Jordan**: But nevertheless it's called an option button. So that's what's called in the library. And yeah, I referenced them when I sort of referenced behavior when it's disabled. It has a great out selected state. And I did that kind of twofold. One of them was literally writing these things in Visual Basic 4 taking a screenshot from my VM and measuring the pixels. And the other was the actual spec that behavior.

**Jordan**: A couple of things didn't match up really well. So one of them was the guidelines specify spacing between items. So spacing between buttons that are in the same group

**Jordan**: And in opposite groups, as well as how far should these bugs be from the edge of the window? How far should the labels of an input box be from the input box? Those sound really good in theory, but when I went to measure these things, it was never correct. Literally, never. I would go into system preferences on Windows 98, like you right click your desktop, you got to change your image. Those bugs small, and they're really close to the edge of the page, and they don't match the guidelines. I don't want to say which source of truth did I use, but I made up some numbers.

**Jordan**: The space between two buttons is eight pixels because that's what looks kind of good. They define it as they have a standard unit, which is 1/4 of the width of the X character, so that seems very similar to ch in CSS. Then they have things like a button should be seven units from the edge of the window. But when I went to measure it, it's like okay, this isn't correct. It should be seven pixels, but it's actually nine, what's going on here. A lot of things were screwy, and I strayed off the beaten path. Spec behavior, but I'm not aligning to the spec for those things.

**Henry**: It's so funny hearing you say that, because it reminds me a lot of even just thinking about Babel and how it relates to the JavaScript spec. What you're doing is there's this thing that is written down. In this case, JavaScript's changing all the time, but yours is fixed. We have to use... well, I'm not reading the spec, but someone is reading the spec. They're going to write the code-

**Jordan**: You don't read the spec? No, I'm kidding.

**Henry**: I don't even know how to read it, actually, which is sad. Same thing, you're reading the spec. Sometimes it's wrong, quote unquote, because it doesn't make sense or something, and it's because other humans wrote it. There's no necessarily... there's kind of like the difference between implementations and the spec. Whatever the spec is written in, English, or whatever it is, and for JavaScript, each JavaScript engine. They all implement 100% of it, so there's bugs in between all of them. Browser bugs.

**Jordan**: Is there one true engine? Like in Ruby, things are based off of MRI, Matz's Ruby Interpreter. If you're writing a Ruby Interpreter, it should behave like an MRI. Is that not the case with JavaScript? No, it's a specced out language ahead of time. Interesting. That's really a problem.

**Henry**: Actually, that's a good thing and a bad thing. You don't really match the implementation, you match the spec language. Then they even have caveats, like there's something called Annex B, which they always have horror stories about that. It's sort of like defining undefined behavior. It's too vague, and people implement it in a certain way, so we should spec out what browsers do that are the same so that when you do implement an engine, you want it to be as similar as possible to the existing one. You also keep that in, but it's like no one wants to figure out that behavior, but then you're going to find these edge cases eventually because how many millions of people are using JavaScript.

**Jordan**: Yeah, that's wild. For me, I definitely take an implementation approach ahead of the specs. The spec drives a lot of the docs, and it drives what I name things. But in terms of actual pixel measurements, I go by measuring my BM. In the title bar, the blue thing at the top of the window, I know that it's literally two pixels from the edge of the screen because I've seen it. If the thing in the book calls it four units, and that unit is maybe half a pixel, sounds good but that's not how I did it. This is going to bite me in the ass, but when it came to icons, icons I have to measure because those are not necessarily specced out. They have a couple in the book, but there are ones that are missing. I guess as a tangent here, that was one of the most fun parts of the project, was loading up in VM player, loading up in Windows 98 playing SIM Coaster when I want to.

**Jordan**: Then writing Visual Basic again, which is super fun. Visual Basic is how I learned how to program, so writing it again is super fun. Dragging and dropping UI elements onto this little canvas, which is probably how modern web development looked like. That's another podcast, but anyway, dragging and dropping. If I wanted a scroll bar there, I'd put a scroll bar there. Looks great. Then measuring it, pixel perfect was so fun, and the icons were so fun to draw. I don't know why, it's just a part of my brain. I had Figma open, and I'm looking at this question mark icon. I'm zoomed the hell in, and I'm copying it pixel by pixel until it looks great, and then I'm aligning it inside the button until it's great. It was so fun. It's like-

**Henry**: A puzzle or something.

**Jordan**: It's a puzzle. Yeah, it's like doing a puzzle. It's just fascinating to me. I don't know why it was so fun. It's so rote. At the end of the day, I'm not creating anything, I'm literally copying someone, but I'm copying code that's been there for 30 years. Fascinating. Figma, really good pixel editor. Also, just a really good design tool. I did it separately after the fact, so after I wrote the CSS library, I did it again in Figma to learn about components and auto-align and stuff. Figma's a fantastic design tool. I'm literally blown away by what they accomplish in the browser, and it was super fun for pixel art, it was also just fun to be able to draw. I have a Window component that I just drag and drop it, and I can just fill out the text at the top and text in the buttons, and it looks like Windows 98. It's so cool.

**Jordan**: It never fails to just impress me, so I'm having fun with it in two ways. One was writing it in CSS, and another one was doing it on Figma. Then the thing I neglect to mention was once you're done going through the process of making an icon, you just copy it to SVG. You just paste it in your text editor, and it just works. It's amazing. The SVG representation under the hood is very good, looks pretty good, so I learned a lot of SVG in this project as well, which was super fun. I've done a lot of things in Canvas before, but the SVG's great. I have a little web service for the badges so it shows the change of size in their version. That's not Next.js, it's just a now service.

**Jordan**: Just a little microservice that literally returns SVG as text and then that's what gets rendered there, which is going to sound very obviously to a lot of listeners, but it's something I didn't know. I didn't know how you draw a picture from... I know how return JSON, but how do I return picture. Turns out you can return SVG, and it just looks like it's just text. It's just mark up. I had a lot of fun learning about that, the intricacies of how paths work and stuff like that. I learned a surprising amount of things with this. You never expect to. That's sort of the beauty of writing code and interacting with computers in general, is that you have an idea of Windows 98.

**Jordan**: Turns out you're going to learn a ton of stuff that's completely not related to Windows 98. That's what makes it fun. This project's really all about just having fun with it, and I know that sounds so cliché to say, but I wasn't going to finish the damn thing if I didn't have fun with it. I spent two weeks on it. I'm not going to spend two weeks on something that's not fun because there's no financial payoff for this thing. I'm not charging for it. I guess branding-wise, I don't know, it makes me look pretty good. I get to be on a cool podcast with Henry, it's amazing.

**Henry**: Well, I hope that people don't think that the only reason you were on is because you made this. That'd be funny because I think we should've done a podcast a long time ago.

**Jordan**: You definitely asked me, and I gave you the very empty, "Oh yeah, sounds good. Let's do it." I like these things. I like the sound of my voice. I like talking. You've known me for a couple years now. I really enjoy talking, so I'm happy to rant about any topic.

**Henry**: Good guest. You can just go, and I don't even have to say anything.

**Jordan**: Yeah, just whatever you want. You did have a nice little outline here, and I think we covered a good amount of it. But yeah, it's been a fun project. I don't know what I'm going to do with it. The way that I do projects, this sounds so silly, is my motivation doesn't make any sense. I've tried to pinpoint it, I've tried to figure out what motivates me and what do I find interesting both at work and in personal project. I can't pinpoint it. Usually it's nostalgia and Pixel Perfect stuff that we talked about at the beginning of the episode, but when it comes to getting my butt in the chair and writing code, I can't predict it, it just happens. I like to think of it as a tsunami coming in.

**Jordan**: You think about this problem for two years, of can I make a design library that looks like Windows 98? No one's really done a great job. I could probably do it, I feel like I'm smart enough. I feel like I'm weirdly passionate enough about this that I can make it work, but that wasn't enough for me. What was enough for me was I was sitting on the couch and I was like cool, let's try this damn thing. Then you do it, and you get sucked in, and you just work on it because it's fun and it's rewarding. There were days where it was not rewarding. It's a Saturday, and I'm like I should probably get the site out, or I could just play Astroneer instead. I could just mine the moon. Astroneer's a very good video game, by the way. The space colony that I've been playing too much. I could play Valorant instead, Valor. That's fine.

**Jordan**: I like to think of this as like breathe in, breathe out. You've got to do both, you can't pick one. I need my time for being productive, if you count writing CSS that looks like Windows 98 as productive. I need those days, but I also need the days where I don't do anything. There were days where in the back of my mind, I knew that I want to finish this thing, just not feeling it today so I'm not going to do it. And I don't feel guilty about that anymore. I used to early in my career, and that made open-source fairly difficult, especially when you're balancing it with a job. All your energy is expunged in your nine to five. Writing code is probably 20 hours of that... well, that's a lie. You're writing code for probably five hours of that.

**Henry**: That's another podcast.

**Jordan**: It's a lot. Yeah, we could talk about that too. Work-life balance and all that. Five hours of deeply focused code a week is a lot, and you don't really want to come home and write stuff anymore. So I had my days where I was super into the idea. I had my coffee and I'm like sweet, let's just make this text box work. Then there were days where I just literally had no interest in doing it. Give yourself enough time, for me, it was two weeks, and you get this stuff out. Time on the clock's probably not more than 10 hours, but you need more time. I need more time than when I was younger. I'm not old now by any means, but I just work slowly because I work in short bursts. I can hyper focus, get you a button really good in 30 minutes, and then I'm tired for six days.

**Henry**: I wonder if it's similar to writing then, because I think when I want to write something, it's like when you're in the moment you want to say it, you just do it. Otherwise, it's not happening. It's just not.

**Jordan**: Oh, literally 1000%. I could never write a book. It would just take me more than a lifetime. It would take me several lifetimes to write a book. My blog posts, if you want to Google me, whatever, you can go to my blog. They're all really short. I don't edit them. There's probably typos in them-

**Henry**: PRs. Those are PRs.

**Jordan**: Sure. It's on GitHub! Thatjdanisso.cool. I used to care about that, and I used to think my blog post has to be perfect, but it takes so long. And again, this goes back to the CSS, I don't know what a perfect blog post is. I'm not a good writer, so who am I to say that I'm using too much passive voice. I don't know what that is, I got a B+ in English in high school. So for me, a blog post is like I have an idea, stew on it for a bit. Rich Hickey, what is it called, his hammock driven development. You go off and you think about it for a couple of days, and then one day you're like why not? You sit for 30 minutes and you just cram something out.

**Jordan**: That's what happened with the 98.css blog post. I was like cool, should I blog about this? Sure. It used to matter to me, where I'd be like oh, I got to get this out on launch. How could I launch without a blog post? That's so stupid in hindsight, so now as a very mature senior engineer, I know what it's like to be like I don't know, I don't feel like writing a blog post today. Then a week later, I'm like yeah, fuck it. Why not? Then you sit for 25 minutes and you write it, and it has typos, and you just ship it. That's how all my writing, that's now the Guy Fieri posts happened. I almost didn't finish that. This was four years ago, five years ago.

**Henry**: 2016, yeah.

**Jordan**: You have a good memory.

**Henry**: I looked it up because I figured.

**Jordan**: You have to do due diligence research on your guests, right?

**Henry**: Well, that was what I was going to talk about. Even I have to learn the same lesson that you're saying, but for every single new thing I do of me wanting to be perfect. I feel like I could probably do a lost more podcasts. Not to put out more content but just because I want to talk to more people, but I feel like I need to research them. Then I'm not even-

**Jordan**: Don't research me.

**Henry**: Considering them as a person.

**Jordan**: Ooh, that's a good point.

**Henry**: It's like just talk. Why do I care about sounding informed or whatever? You do a little bit just to have something to say, but after a while, just post it. Just what you're saying, just do it.

**Jordan**: Yeah, just do it. Typos is me burping by in the accident into the mic. You just leave those in. Or coughing. I should say coughing instead of burping. I used to be a perfectionist. I've been on anti-anxiety medication for a couple years now, so I know that I'm just more mellow of a person in general, and that definitely transcends into my writing, which is I don't care. I'm in a position not to care. Again, I'm a white dude. It's easy for me to have a typo. No one's going to post my home address and try to dox me because I fucking call Haskell bad, something like that. Part of me feels a little guilty that I care so little when other people that don't look like me have to care a lot. I could easily see another person putting out 98.css and just getting fucking flamed for it.

**Jordan**: Not to say that I don't get mean comments, but mine are nothing. People write in, they're like oh, it's actually off by a couple pixels. I'm like cool, no it's not, shut up. Then that's it. That's the end of the conversation. It's not a wall of just harassment over and over again, just a dehumanizing aspect. I have the privilege of not being able to care, and I exercise that widely. I like to hope that helps me open up doors for other people, like if you want to contribute to 98.css, I have it on GitHub. I guess it's unfair to say because I get the credit for it, but you can put it on your GitHub and you can point to PRs and stuff, but I'll make that a really nice experience for you because I don't care about perfect, quote unquote, I'm doing air quotes very strongly in video right now, perfect code. I don't know what that is.

**Jordan**: I've been writing code for a really long time, I like to think I'm pretty good at it. I don't know what perfect code is. And for me to say this code's not perfect, do it again, is just so rude and arrogant. So I don't know, give me whatever you want. As long as it works, as long as it's successful. That's how I look at everything. That's how I blog, and I like to think that it's allowed me to put stuff out there where, as you mentioned, it's not really like you want to be a hyper blogger, podcast influencer type that just has 10 episodes a week, but you want to talk to people. I'm the same way.

**Jordan**: I want to share my ideas, and I found it easier to share my ideas. Unfortunately, I found them easiest to share on Twitter there's no effort to just put out five tweets about a cool programming thing you found out. But if I can lower the barrier of entry to a blog, how can I put out some really scrappy blog posts where I just don't care about the person on Hacker News that's going to be like, "Well, actually, I studied the Lambda Calculus for five years, and this is why you're wrong." I don't really care about that person. It's not who I'm really writing for, it's not my audience.

**Henry**: I think understanding your audience. It's like with the podcast, sometimes, especially if I'm going to go off and talk about non-coding things and the people that follow me are probably following me because of Babel specifically. I'm just making podcasts about anthropology, it's like no one's going to like that or tweet it, and that's fine. I need to be okay with that, if I actually care about this topic and just go with it.

**Jordan**: I've gotten okay with it. There are things I tweet about. I've been doing a lot of computation stuff, like I mentioned Lambda Calculus as a joke, but I've been doing a lot of SKI combinator calculus, and computation going through Tom Stuart's computation book, which is phenomenal.

**Henry**: You mentioned the fractal thing earlier, too.

**Jordan**: Yeah, yeah. Just having a lot of fun with it. It's just fantastic academic exercise, and the engagement on those tweets is nothing. On Twitter, you could be like node_modules are big, by the way, and you get 10,000 responses. It's so stupid. And if you want retweets, like if you want to be the person that is talking about hey, look how many stars my GitHub project got, look how many retweets I have, these sort of output metrics as I call them, you can hack those. I'm not into that, I'm more into I have things I want to share with people. Let me make it easy. For me, it's easiest to write something that's silly. It's easiest to... Sorry, did I click something in the podcast thing, or are we good?

**Henry**: No, we're good.

**Jordan**: Okay, awesome, sorry. It's easiest for me to write something silly. It's easiest for me to write something that reads very much like how I speak. I don't edit my writing to resemble it to anything else. It's just easier for me, and that's what I do.

**Henry**: We're just so worried about I don't know, what other people think or what I think other people think. I've just spiraled thinking of that, and then-

**Jordan**: It's tough. And again, a lot of it is certain people get way more hate for the same things, which is unfortunate. I can make a typo, it's not a big deal. Other people can make a typo, and they just get flamed. But that being said, you talked about audience. My audience for my blog post is usually people that didn't know the thing that I blogged about, which is way the fuck more than the guy on Hacker News that isn't really good at the thing I just wrote about, and if they're a rude person, I don't care about them. If they say oh, you actually made this typo here, it's supposed to be X squared over 6X plus blah, blah, blah. I don't know why I'm even using that example. Where did that come from, right? But anyway, I don't care about the experts too much. I'm not really writing for them. It's not an academic paper. 98.css is not a research project, it is-

**Henry**: That'd be funny.

**Jordan**: I probably could get a PhD out of it. It is fun, and that's what it's supposed to be. My blog posts are fun. They're supposed to be fun to read. I care way more about inspiring someone that didn't know about the accessibility thing I just blogged about way more than the accessibility expert, because why would I even want to impress them? I don't know. I'm not going for an award or an accolade, or a peer-reviewed journal, I'm just literally trying to teach. Cast a wide net. The obvious extreme of that is saying node_modules big and then getting 10,000 retweets. Be yourself, but don't feel like you got to be perfect because you don't. I don't know what's perfect.

**Henry**: Or just make your audience everyone. It kind of reminds me of I've seen on some blogs, any particular... I forgot where I got this from, but they'll put assumed audience at the top of the blog, and so then you can say I am writing this for this type of person, so that way you kind of know up front why-

**Jordan**: That's

**Jordan**: That's pretty good.

**Henry**: You say certain things.

**Jordan**: To be honest, my only FUD with that is that I don't know who my audience is a lot of the time I say. It's like I said it was yeah, perceived audience, I have no fucking idea. A lot of time it's people who don't know about accessibility, I guess I could put, but I worry about self-selecting at all because I don't know you have to kind of look at the risks, right. The risks is someone comes to my blog, they read the first paragraph, and they leave. That's fine. I do that too. I did that to probably 20 people today. I hope they don't feel bad about it.

**Henry**: They don't know so.

**Jordan**: Yeah. They don't know, and they shouldn't care about me. I'm literally nobody. I don't matter. So if you're blogging about some cool CSS thing and it doesn't interest me, don't worry about it. So yeah, that's the risk is someone leaving. The other risk is again, the expert being snarky to you on Twitter. Which again, I don't care about them. I don't. Whatever, who cares. I've been flamed by lots of people. I have a picture of Jonathan Blow calling me an idiot on my wall, right? It's my Twitter background.

**Henry**: Love it. I tell people about that all the time.

**Jordan**: That's awesome. It's a great story. Yeah. We can have a podcast about him too. I still like him as a person. I don't agree with this politics, and I don't think I would want to work with him ever, but he is smart. Your know, for certain things he's really bright.

**Henry**: I finally finished The Witness too.

**Jordan**: What did you think?

**Henry**: It was-
**Jordan**: When you say finished, what do you mean by finish?

**Henry**: Meaning that obviously, I didn't do all the puzzles and everything. Just the-

**Jordan**: What was the last thing you did?

**Henry**: Just I guess I would call it the normal ending. I don't know what you would say.

**Jordan**: I don't want to spoil it.

**Henry**: Yeah, there's plenty of other stuff I'm sure.

**Jordan**: We'll talk after this.

**Henry**: I got tired of it, so yeah.

**Jordan**: Okay. Very good game, The Witness. Witness is made by Jonathan Blow for anyone listening and doesn't know that. Very good game. One of my favorite puzzlers in the last several years.

**Henry**: I think it was because I did too many puzzles. I also played Antichamber so then.

**Jordan**: Do you need a break from puzzles you think?

**Henry**: Yeah.

**Jordan**: I understand that. Today, I didn't do many puzzles. I didn't do any chess puzzles today. I usually do those in the morning. I didn't actually do the crossword today. Today's Friday, right, so it's going to be hard.

**Henry**: Yeah. How about we end with the guy theory stuff then?

**Jordan**: Ooh. Should I give a history lesson?

**Henry**: I don't know. It's funny because before we were talking about it all the time because it was funny, and now it's been so long. It's sort of what you were saying before, there's always people that don't know or like when you're writing about anything, right, or if you're talking about something. So if you want to give them yeah it could be a history lesson. I don't know. There's a lot to talk about.

**Jordan**: Yeah, so we mentioned this before, by I used to read a lot of satire on Medium. One of the posts was a suggestion that I looked into my node modules directory and I found all these horrible things. The first example was, Oh God, was it Express? Amber was a second. Express.

**Henry**: Yeah.

**Jordan**: Was it Express? Yeah, and it was liking a Tweet from hot pockets.

**Henry**: Hot pockets, yeah.

**Jordan**: There was an ad in the node_modules. So that was the bait, right. People were even like, Oh my God, this guy might be on to something. But a lot of people also knew it was a joke, right away. That was the intention. Once you're reading this you're like this guy's out of his goddamn mind. The second one was vendors in the entirety of the Encyclopedia Britannica. And it's several hundred megabytes or whatever. The third was Guy Fieri appearing in the source code of Babel. And the screenshot for it, I'll try not splinter off too much, but the screenshot was literally it's my text editor, and then I took a picture of Guy Fieri, not like text, actually a picture.

**Henry**: The actual picture.

**Jordan**: I just put that in my editor. It's like exports.guy = and there's the picture, which doesn't make any sense. Again, we could have an entire podcast about how editors have not proved much since the seventies, Text editing is a disaster, but anyway, you can not put pictures in your source code without plugins. So this didn't make any sense at all. Nevertheless, a lot of people found it funny. A lot of people thought it was very stupid, fine. Again, I don't really care about them. A lot of people thought it was real. Which doesn't make any goddamn sense.

**Henry**: Because you put typos in there everywhere and stuff too.

**Jordan**: Yeah. It's a whole thing. There's hidden jokes in there. Links that go to the wrong thing. I have a screenshot of the searching for glitter instead of glimmer on getting healthy, getting zero results. And I say I've never even heard of this glimmer thing. What is this spyware? And then everyone starts flaming you going, Oh my God, you're so stupid. You search for glitter, and it's like a honeypot, right. You get a honey pot for these snarky people, and I just love that, man. I love that stuff. It just gets me going because you're making a fool out of them. You're making it public that you were so rude to me. Here, I'm going to show the world how rude to me you are.

**Jordan**: Yeah, a lot of people read through the entire thing and found it sincerely, which is sad for when it's a non-English speaker because I don't want to make fun of them. I don't want to make fun of anyone that didn't get the joke because they didn't understand my writing. But there are people that are English speakers that are VP of engineering at so-and-so, they're like, wow, definitely never using Babel again. I'm like okay, wait, hold on, pump the brakes a little bit. And no one said that, but people did say, wow, this is crazy. You could tell they didn't finish it. I don't even know. It doesn't make any sense.

**Henry**: I don't know if you remember it, but you know how on GitHub you can have Wiki pages?

**Jordan**: Yes.

**Henry**: And I don't know how many projects use that much. We didn't, I guess, and someone made... And I think by default, anyone can edit them. So someone made a new Wiki page, and I don't know how you would find this. I guess I saw it in my notifications and it said, yeah, I found out about the Guy Theory, and I'm going to tell everyone in Silicon Valley not to use Babel. Something funny like that. Get the word out there or something.

**Jordan**: Do you think it was real? Like they really meant it.

**Henry**: I think so. I don't know why you would do that.

**Jordan**: It's terrifying. Absolutely terrifying. Yeah, it's always fun when you literally can't tell. Like that's the third option. One is these people are in on the joke. The second is people don't get the joke. And the third is you still don't know, and that's the best. You have people that go to great lengths and write these detailed responses that don't know.

**Jordan**: Like I said, the best is when you honeypot people. I have an example of them there. So glimmer is, I think I even made up the number. I said it's 180 megabytes. And I said, if the entirety of recorded human history could fit into a single megabyte, then this node module would be 180 times the size of recorded human history. Which doesn't make any sense. You can't just define what a megabyte is, and then use that as an example. That I believe is called a straw man fallacy, but nevertheless, people are like, is this guy serious? The entirety of human history is way more than a megabyte. And it's like, no, obviously I'm not serious, but they didn't get that. I don't know again, native speakers, and they still, whatever. [inaudible 01:10:12]

**Henry**: I liked the command line usage. I forgot what it was, but-

**Jordan**: Oh, I tried to find the file size and I entered it incorrectly about four times in a row.

**Henry**: Yeah. That was cool. That's real though. That's why it's funny.

**Jordan**: So it'll say find length, command not found. So I have that. Usually, you don't see code examples with errors in them, so I thought that was a fun bit. Yeah, there's a couple of little pieces of treasure in there. Again, it's one of those things. You have fun writing it. I made myself laugh doing it, and I need to laugh. So yeah.

**Henry**: No, it was good, and it created so many side things. I think you know when something's good when... Remember we found out a few years later, I think I messaged you, that the Britannica thing someone actually-

**Jordan**: Someone used Lerna to like made a Britannica module, and it was real. I don't know how they even built it, but they got all the terms and then wrote a script, I guess, bizarre.

**Henry**: And they had a package for every letter too. So it's like Britannica A, B, C, D, and they all linked to each other. It's just like this crazy Frankenstein-

**Jordan**: Spider web.

**Henry**: Yeah, of dependencies. Yeah.

**Jordan**: Yeah, it's a wonderful commentary. It's funny when people, and again I can talk about this for hours, but people sort of provide a commentary for why did I do it? I did it because it was really funny and stupid, but a lot of people are like, wow, look at this amazing commentary on how sad the state of node modules. It was absolutely not what I wrote. Again, it's not my decision how people read it, but it was funny that people have to prescribe a meaning to an absolute piece of nonsense garbage that means nothing. It only exists to make you laugh. It only exists to trap people that are going to be snarky and don't finish blog posts, and then they have an opinion on it, right. That's the only reasons it exists, but people are like, look at this, this glaring commentary on how bad Babels node modules are. And it's like, that's literally not at all what I said, but whatever, go for it. People always just pick whatever meaning they want.

**Jordan**: It is funny how far it's gone. I feel like, I don't know if this might just be me, like the public perception of Guy Fieri has also gotten a lot more positive. I read it, he's really cool now. People like him. He's doing a lot of stuff for COVID for restaurant workers. Doing a lot of stuff for the wildfires over the summer. He's always been a cool guy. I've always been a big fan of Diners, Drive-Ins, and Dives. That's why I included them. Fun piece trivia is it was originally Jeff Goldblum. And I had a picture of Jeff Goldblum in there and had exports.jeff =, but I didn't think it was as funny as Guy Fieri. Yeah, it could have been Jeff Goldblum.

**Jordan**: I also have a fourth example. I was going to do something with React, but I ended up deleting it, just doing three. But yeah, it was originally Jeff Goldblum, and then I changed to Guy Fieri before I published and it was way funnier. Guy Fieri he's just a funny... I think it's Guy that wears bowling shirts and his yellow spike hair. It's hilarious. He's a hilarious guy.

**Henry**: I told you about, they have a Fieri-con or something.

**Jordan**: Stop.

**Henry**: In New York. Everyone just dresses up as him and then goes to, I guess around to different bars. Yeah.

**Jordan**: That's hilarious. I have to go. I assume it's not going to happen this year.

**Jordan**: Wow, I've always wondered, I think I've said this to you, I always wonder that the blog post is fairly popular, and I assume he has a publicist. It's monitoring the news for Guy Fieri. You think that's ever come up and they've been like, what the fuck is this? I don't know. I don't know if it's that popular enough where it's like Guy Fieri in the front page of LA Times it's way more than whatever.

**Henry**: Oh yeah, and then later another part of the story is that we ended up adding the ASCII version of the picture, right, to the code base, and we merged it. And I think that was only like an hour after it happened so then people linked to it and then some people thought it was real because the order is wrong.

**Jordan**: We absolutely just ruined history. We re-wrote history, yeah. And then I submitted a PR to remove it.

**Henry**: Well I asked you to basically.

**Jordan**: Yes you did. I mean this is how we became friends, right?

**Henry**: Yes.

**Jordan**: It's a fun story. But yeah, it was hilarious because people are like, wait, is this real because look at this PR. And it's like, you can't really tell, you know what I mean? It just muddies the waters, which is what makes it so great. It's fun.

**Jordan**: Yeah, I like to think that I have very strong opinions on tech satire. Like I said, I already ripped on a variety of people that do ha-ha node_modules, but they get 10,000 retweets. I think it's stupid. A lot of people have stolen my jokes and get 10,000 retweets. That also sucks. And then we talked about the harassment aspect. Jenn Schiffer couldn't talk about the hassling by the people put her address on Twitter, Street Field. No one has ever done that to me, not even close, and I've done horrible shit on the internet. And I don't get any sort of harassment. No one has ever DM me creepy or anything like that.

**Jordan**: The other sort of thing is I... See I'm losing my train of thought here, but I used to do a lot of the satire as sort of a way to laugh at no one's expense. Maybe at my expense because I kind of do self-deprecating humor in the blog post a lot, but I'm not making fun of Babel. I'm not making fun of Ember. I have a couple of rifts in there of Ember's library for very quickly rendering to-do lists, but that's not actually making fun of Ember. That's making fun of TodoMVC. Kind of, or not really TodoMVC, but like people's perception of TodoMVC. So I'm making fun of people that overprescribed TodoMVC results.

**Jordan**: I made fun of the guy. Your Twitter handles left pad. I made fun of the left pad guy a little bit. I called him a rouge developer instead of rogue, and he actually did get upset. He sent me a vaguely threatening Twitter message, but again, not a native speaker, so we had a chat about it. We're cool now. We're all set.

**Jordan**: But anyway, and no one's expense, right. You make people laugh. You don't have to make fun of someone to get laughs out of people. You can just make fun of everything without being overly enlightened centrists. I'm not saying everything's bad, ha-ha. Just like being silly, and I don't know, it's kind of cool. It's a cheap way to smile, right. You're smiling at no one's expense. No one's getting made fun of. So I'm into it, but I haven't done it as much. I think that it's so much easier to put out a funny tweet than it is to do a funny Medium post, and it reaches more people faster.

**Jordan**: Mediums also changed a lot, man. There are like modals everywhere. It's hard to read them on your phone. That post is behind the paywall now, though. And I have made a decent amount of money. Just every month Medium writes me a check and that pays for my HBO Go and my Netflix and stuff. So it's kind of nice over the years to just have to report it on my tax and stuff.

**Jordan**: But yeah, it's bizarre. I could talk about it for hours. The responses and how I feel about it and all that. I don't know, I'm not embarrassed by it. A lot of people, I would say I'm most well known for that probably in the scheme of the internet and I'm not ashamed of it. I'm not embarrassed. It's fine. It's cool. I'm proud of that work. It's all right.

**Henry**: Yeah. In terms of the balance between making fun or not wanting to make fun, like mocking people. I was thinking, it kind of reminds me of Angus's the Babel song basically that he made.

**Jordan**: I think I've listened to it.

**Henry**: Yeah, and so in a way it's talking about how Babel is compiling your code and it's based on Hallelujah, right. And so you can say it's making fun of Babel, but in a way, you could say it's more... I just thought it was funny. So then in the same way, you could have thought that was an insult or something, but I was like, Oh, might as well just make it the song. I just go with it, and I thought that was cool. Yeah, and he just did that for fun too. So yeah.

**Jordan**: Yeah, you got to laugh. I don't know. My motto for life and the thing that trace everything down to is I just like to make people smile, and if that's 98.css or if it's a Guy Fieri post, that's what gets me going. It's just making people smile and making myself smile, really. I'm a deeply sad individual sometimes though. I have to make myself smile. That's also pretty good too. And yeah, I don't take myself too seriously. I don't see the value in it. Be nice to people. That's it. It's how I live my life.

**Henry**: Yeah. I think that's a good place to end, actually.

**Jordan**: To end on a lofty, high horse, philosophical point.

**Henry**: Yeah.

**Jordan**: I think that that covers everything on my mind. Thanks so much for the chat and asking me questions.

**Henry**: Yeah, thanks for joining.

**Jordan**: Yeah, like I said, anyone here, you're welcome to read my blog, thatjdanisso.cool. You can also find me @jdan on everything. GitHub, Twitter. J-D-A-N. Follow me on Instagram. Follow me on SoundCloud. I don't think I have either of those, but go ahead and do it. Donate to AbleGamers, my favorite charity. AbleGamers.com please, thank you. That's my pitch, and I'm sticking with it.

**Henry**: Awesome.

**Jordan**: Thank you, Henry.

**Henry**: Thanks for listening. Check out our website, maintainersanonymous.com for show notes and transcripts. If you have any feedback, ideas, or guest suggestions, you can reach me on Twitter @left_pad. If you'd like to support the show, you can visit patreon.com/henryzhu.
