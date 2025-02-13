---
title: "MA 10: Jonathan Farbowitz on the Commitment to Infinite Uptime"
season: 2
date: 2019-07-15
time: "75"
description: How should we think about saving something forever? Jonathan
  Farbowitz (Guggenheim) continues the on-going discussion of software
  preservation with Henry in talking about the goals of museums, the hard (and
  maybe impossible) task of keeping something intact, the norms and steps of
  conservation, comparing physical and digital artwork, the importance of
  authors in conserving a piece, emulation vs. language porting (rewrites), a
  discussion about an art's 'dependencies', possibly adding automated testing,
  and deprecations/breakages in environments/standards.
episodeLink: https://anchor.fm/s/ff707650/podcast/play/96461852/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-11-31%2F392345811-44100-2-0239b07cde78fc95.mp3
embedUrl: https://podcasters.spotify.com/pod/show/hopeinsource/episodes/MA-10-Jonathan-Farbowitz-on-the-Commitment-to-Infinite-Uptime-e2su9is
sidebar:
  order: 10
---
### Links

- [Jonathan](https://twitter.com/jfarbowitz)
- [Guggenheim](https://twitter.com/Guggenheim)
- [Unfolding Object](http://unfoldingobject.guggenheim.org), [(blog)](https://www.guggenheim.org/blogs/checklist/the-guggenheim-restores-john-f-simon-jr-early-web-artwork-unfolding-object) an artwork mentioned in the episode
- [Guggenheim’s Conserving Computer-based Art initiative (CCBA)
  ](https://www.guggenheim.org/blogs/checklist/how-the-guggenheim-and-nyu-are-conserving-computer-based-art-part-1)
- [Fostering a Community of Practice: Software Preservation Project](https://www.softwarepreservationnetwork.org/fcop/) cohort that Jonathan and Wendy are a part of
- [Emulation as a Service and EaaSI Project](https://www.softwarepreservationnetwork.org/eaasi)
- [vrecord](https://github.com/amiaopensource/vrecord) (open source video digitization software)
- [Rhizome’s Webrecorder](https://webrecorder.io)

### Transcript

> Conversations may be edited for clarity. [(edit)](https://github.com/hzoo/hopeinsource.com/edit/master/season-2/conservation.md)

[00:08] **Henry**: Yeah, today I have with me Jonathan Farbowitz. He's a fellow in the conservation of computer-based art. He assists at Guggenheim's conservation department addressing preservation needs of computer-based works in the Guggenheim collection. He also supports the development of best practices for collecting these kinds of artworks. He's also worked on the restorations of Shu Lea Cheang's Brandon, which is from 1998-1999, and John F. Simon, Jr.'s Unfolding Object, which is in 2012. He holds an MA in moving archiving and preservation from NYU as well as a BA from Vassar College and also has previous experience in software development and testing. Thanks for joining me today, Jonathan.

[00:51] **Jonathan**: Thank you for having me.

[00:53] **Henry**: Yeah. I guess just some background. I interviewed Wendy before and she's part of this cohort for preservation, and she I guess got me a lot more contacts to talk with, and I think everyone does different things, so you're focused on artwork. Then I realized that I've never been to the Guggenheim. I live here in New York. So I guess I just reached out to you and I went two days ago with some friends. It was just good to actually go there, even though we're not really going to talk about the museum itself, but it's good to have the context.

[01:33] **Jonathan**: Of course, of course, yeah.

[01:35] **Henry**: Yeah, so thanks again.

[01:36] **Jonathan**: You're welcome.

[01:37] **Henry**: I think we should start off just some intro on what are the goals that you would say of museums and then what about Guggenheim specifically.

[01:48] **Jonathan**: Sure, yeah. I just want to add quickly, Wendy and I are both part of the same cohort. It's the Fostering Community of Practice Software Preservation. It's an affiliated project of the Software Preservation Network. The Guggenheim, along with Georgia Tech, is also, we're part of the cohort.

[02:16] **Henry**: So a bunch of universities?

[02:18] **Jonathan**: Yeah. It's most university libraries. We're the only museum in the cohort. But just to get back to your question, my fellowship is part of the conservation department, so as a museum we collect all these artworks. They're part of our permanent collection, the idea being that they're held by the museum and they could be loaned to other institutions in the future or exhibited at the Guggenheim, and that they're held in trust that the public is going to be able to do research about them, is going to be able to see them indefinitely into the future.

[03:05] **Henry**: That's a huge responsibility.

[03:06] **Jonathan**: It is a huge responsibility, yeah, and not taken lightly by any museum. My fellowship was created specifically to focus on computer-based artworks within the Guggenheim collection.

[03:24] **Henry**: I guess based off that, has your position been around for a while and how long has it been-

[03:30] **Jonathan**: My position is relatively new. I've been at the Guggenheim for about two and a half years through what we call the CCBA or the Conserving Computer-Based Art Initiative. That initiative began a little bit before I started, so it started around 2014. We had Joanna Phillips was the conservator of time-based media at the Guggenheim at that time, and she started collaborating with Deena Engel, who is a computer science professors at NYU. Joanna and Deena started looking at computer-based works in our collection.

[04:19] **Henry**: So you already had computer-based art already.

[04:21] **Jonathan**: Yeah. Our first work was collected in 1989. It's an untitled work by Jenny Holzer. Jenny Holzer works with a lot of LED signage and this particular work was part of her show at the Guggenheim and it's an LED sign that goes up the entire spiral of the rotunda. I mean, I didn't see it in person, but it looked amazing. That was our first computer-based or software-based work. Maybe I should also define computer-based works-

[05:00] **Henry**: Yeah, that could be fun.

[05:01] **Jonathan**: ... computer-based artworks, because it's not always completely obvious. What we classify as a computer-based or software-based artwork is one where software is integral to the work being exhibited. We get a lot of artists now who are using software let's say to edit a video, but the final artwork, the final product that comes to the museum is just a video file. That's not considered a software-based work. A software-based work would be the artist either wrote software that is executed on a computer in the gallery or the artist created a website as artwork or the artist created something like a custom micro-controller in the middle of an installation. The micro-controller might do things like run a conveyor belt, or if someone comes close it might turn on some lights or move something or play some audio. Those are works where software is really integral and is being used as a creative medium.

[06:12] **Henry**: Right, the medium itself versus just taking a picture of that thing.

[06:17] **Jonathan**: Yeah, or all the editing software now is all on computers for photos, for video, but that's considered kind of separate from software-based artwork.

[06:30] **Henry**: Right, makes sense. How many pieces of digital art are you... I don't even know what the word is, taking care of right now?

[06:39] **Jonathan**: Yeah. How many pieces that are in our collection. The number keeps growing. We have about 30, actually.

[06:52] **Henry**: Wow. How many is that compared to the physical art?

[06:59] **Jonathan**: Other museums? Or, oh, physical art. Computer-based works are physical in a lot of ways as well.

[07:07] **Henry**: True.

[07:08] **Jonathan**: But in terms of sculpture and paintings, this is a small, small group of artworks. We have about 300 time-based media artworks. Time-based media means anything that uses duration as part of the artwork. Included in time-based media would be things like video art, film, audio-based artworks, and software and computer-based artworks. We have 300 artworks that we consider time-based media, and of those 300 about 30 are software-based, so it's again a small subset. Most of our time-based media are video works for the most part.

[08:01] **Jonathan**: But again, unlike sculptures and paintings, computer-based artworks are highly vulnerable, because with a painting it's possible that if you store the painting in the right conditions you can pull it out in a couple of decades and you still have a painting.

[08:21] **Henry**: It's the same as before.

[08:22] **Jonathan**: Yeah. With the software-based artwork, if you put a computer in storage that ran certain software, if you pull it out in 30 years, I mean-

[08:30] **Henry**: Who knows what's going to happen.

[08:31] **Jonathan**: Good luck, yeah. It could be a lot of issues. These are particularly vulnerable because of hardware and software obsolescence. We have to come up with strategies to deal with them basically right as we acquire them.

[08:48] **Henry**: Right when you know about it.

[08:49] **Jonathan**: Yeah. So in the case if Jenny Holzer, that was a work where there were different standards. There wasn't really practices in place for collecting computer-based artworks in 1989. There have been a couple of works collected in the past where as part of my fellowship I've had to go back and talk with programmers and technicians because again, in those earlier years there weren't necessarily standards for the kinds of things you need to collect when you collect computer-based artworks. For example, source code, certain types of documentation, things like that.

[09:38] **Henry**: It kind of reminds me that sometimes the newer the technology is the easier it is to be obsolete, right?

[09:45] **Jonathan**: Oh, absolutely.

[09:47] **Henry**: And it's funny because we're all chasing this new tech stuff when we're using it, but we're not shifting our attitude to be like, "Oh, how do we save these things?" I think especially programs, not a lot of people are thinking, "How long is this going to last?" It's more like, "I want to get my thing out there and get it used by a lot of people and then hope that because I have money that it'll stay around for a long time." But then companies fail, software, we use this phrase bit rot, stuff like that. Even on the internet, links, they disappear or web servers go down.

[10:20] **Jonathan**: Dead links, yeah.

[10:22] **Henry**: Yeah. That seems really hard to do, right? I guess what are kind of the main ways of preserving digital stuff?

[10:32] **Jonathan**: Yeah. I think you stated the problem really well, especially for some works that we have are web artworks. The whole purpose of web artworks is that they're available 24/7 on the internet. Anyone can see them. You don't have to go to the museum. You just go to the URL and you should be able to access them and interact with the artwork.

[10:57] **Henry**: 100% uptime, yeah.

[10:58] **Jonathan**: Yeah, forever, in theory.

[11:04] **Henry**: Then you see Google Calendar went down a few weeks ago, and all these different artworks need to be available too, so how do we sustain that?

[11:15] **Jonathan**: Yeah, and also as conservators and archivists, we're kind of tethered to these technologies that we don't have much control over. We can't tell Firefox, "Don't deprecate this thing because this artwork depends on it."

[11:31] **Henry**: Well, you could, but I don't know if-

[11:31] **Jonathan**: I mean, they're not necessarily going to listen to us.

[11:35] **Henry**: Yeah, exactly.

[11:38] **Jonathan**: So we're kind of at the mercy of companies and technologies that are going to change without letting us know, even.

[11:51] **Henry**: That's a really interesting point, though, because I work on Babel and that's a project that's involved in JavaScript itself to shape the future of the language. Before, the only people on that committee, the standards body, are the language designers, and eventually we have implementers and people that create those JavaScript engines in the browser and then now we have more practitioners that actually write JavaScript, and maybe we're trying to add in educators. It's like maybe we need to add in archivists to the committee.

[12:24] **Jonathan**: Yeah, I think that would be great.

[12:27] **Henry**: Because a lot of times, all the developers I know just break the web and just get rid of all this stuff. People like to use the example of I think it was, I forgot but it was like NBA Jam or some website that they want to conserve.

[12:41] **Jonathan**: Oh, Space Jam.

[12:42] **Henry**: Yeah, that's what it was.

[12:42] **Jonathan**: Space Jam, it looks almost exactly like it did I guess when the movie came out.

[12:48] **Henry**: Yeah. The committee, they like this idea of one JS, there's only one version of JavaScript. You don't have to specify different versions. It should always be backwards compatible. But what they do is sometimes they kind of subtly break things when they try to... What they do is they'll implement the thing and then test it out and if it starts breaking things they'll revert it back. But if it goes through and not enough people complain then we'll just technically break it because no one's actually using it. Well, how do you know people aren't using it? What if they're not online? What if the artworks are using those things.

[13:21] **Jonathan**: Sure. There's a web artwork from the '90s that uses that thing that just got deprecated, but nobody is necessarily there to notice. Yeah, and artists who makes these kinds of artworks, they're usually working at that edge of how technology is supposed to be used. They're often like hackers, where they're using the technology in ways it wasn't necessarily intended to be used. In those cases it's very easy to break the types of ways they're implementing JavaScript or HTML or other technologies.

[14:02] **Henry**: That's cool, because they're just reflecting what was the thing at the time, and then how do you preserve that.

[14:12] **Jonathan**: In terms of practical measures that we take, a big part of my fellowship, and this was kind of the main reason for the fellowship that the funds were raised and they brought me on, was to do a comprehensive survey and backup of computer-based artworks in the collection. Basically going through each work and saying, "Okay, what data do we have, how can we back up that data?" How can we catalog that so future conservators understand what these files are, how they relate to the artwork. Then also as we looked at each work, looking at what are the vulnerabilities for the future and is there any way we can mitigate against those vulnerabilities.

[15:00] **Henry**: Right. When you say vulnerability you don't mean security vulnerability, but actually making sure this thing will last.

[15:07] **Jonathan**: Right. Yeah, so for example, one artwork that we have, Color Panel by this artist named John F. Simon, Jr., this artwork's from 1999. It's a disassembled PowerBook 280C computer, a laptop that he basically John Simon disassembled it and mounted it on this acrylic board and it's supposed to be hung like a painting, and the PowerBook runs software that he wrote that shows all these different color patterns. It's based on Josef Albers' color studies, so it looks a lot like an animation.

[15:48] **Jonathan**: The problem is now this disassembled laptop from I believe it became obsolete in 1995 is now, that is an artwork, and so you have that huge hardware dependency, and of course that hardware was never meant to last-

[16:09] **Henry**: That long.

[16:09] **Jonathan**: ... very long, yeah. So that's one way to look at it, that when the hardware becomes art then we have to think about what would be the right course of action, of course in conversation with the artist too. Fortunately, John Simon is still around, so we can discuss options with him about that.

[16:33] **Jonathan**: In other cases, it's thinking about like, okay, we have a floppy disk, we have a CD. Let's just get the data off of those vulnerable carriers that are eventually going to degrade over time. Let's properly get the data off there and then put it in our digital repository, more safe storage, and make copies, make redundant copies of it.

[16:59] **Henry**: In that case the floppy disk isn't the artwork itself so it doesn't really matter if you get rid of it.

[17:02] **Jonathan**: Right, yeah.

[17:04] **Henry**: It's the other thing on it.

[17:06] **Jonathan**: Yeah, the floppy disk might just contain the executable file that's going to run the program, so the disk itself is not the artwork, but it's a way that the code or the executable was delivered to the museum, almost like a backup. For example, for Color Panel we have, John Simon gave us the executable program that runs on that laptop on a floppy disk, so we have that preserved.

[17:33] **Henry**: But then for that, given that that kind of computer won't ever be produced anymore, then if it doesn't turn on anymore then you can't really... I guess now the question is what do you do with that then?

[17:46] **Jonathan**: Yeah. We have to again discuss with him and think about what some of the possible solutions are.

[17:56] **Henry**: I guess for that particular thing it's like I don't know if you could find another computer and try to make it look the same, but that doesn't seem to be the same thing at all really.

[18:05] **Jonathan**: Yeah. Then it becomes an issue of yeah, even if you could obtain the same laptop, is it the same thing if you replace the laptop? I think that's a very interesting question.

[18:22] **Henry**: Yeah. There's not really an answer there, other than wanting to talk to that artist about what they think is reasonable.

[18:30] **Jonathan**: Yeah, and what he considers the core of the artwork. Is the core of the artwork the software that he wrote, the hardware, some combination of both? What's his vision for what he thinks is important, what's variable about the artwork, what must stay the same?

[18:54] **Henry**: What stays the same. That's an interesting question to ask in general, because I feel like with a lot of software we don't really think that, what is the core of your software. People are just like, "Oh, it just works." It's just a thing. But then with art you have that vision of what you want people to see from this and stuff like that. I think that's really interesting.

[19:14] **Jonathan**: For the fellowship, the survey and backup, and then also we looked at how to acquire these things in a better way. For software-based works, that requires a lot of talking and discussion with the artist upfront about one, defining what the work actually is, what is the technical composition of it so that we can document that. We've even had programmers come in and we'll do screen recordings where they will walk us through the code that they've written and we're recording the screen and they'll show us line by line what things are doing.

[20:01] **Henry**: Oh wow.

[20:02] **Jonathan**: A lot of artists use this straightforward called Max/MSP, which is a multimedia usually for audio. A lot of DJs use it for audio collaging and stuff like that. So we've had programmers go through and Max is visual programming language so they're actually going through the logic of their Max program for us and we're recording that. So the whole idea of that is that in the future if we wanted to migrate the program to another system or another language other than Max, we have a reference for how the logic of it that we could in theory reverse engineer the program.

[20:52] **Henry**: That's really interesting.

[20:52] **Jonathan**: Again, always encouraging dialog and trying to work with the artist where possible.

[21:00] **Henry**: Yeah, this seems like something where having the artist is completely necessary to keeping this work at all.

[21:06] **Jonathan**: Yeah. Luckily, almost all the computer-based works in our collection are contemporary works and the artist is still around and can answer questions that we have.

[21:18] **Henry**: Yeah, I think this gets to this question of, especially there's a lot in open source, what is open source? What's the core of open source? In the name it's about code but is it really? It's like is it enough for it to be about code or is it about the community and all this higher level stuff around it? I think it's the same question here where maybe it's not enough to just save the code for this art, because clearly what about what was the vision and the metadata and the process to make that thing. Because if you wanted to reverse engineer it, you would want to know how they were thinking about that, right?

[21:57] **Jonathan**: Yeah, and we also want to record references. If we have the work installed in a gallery, let's say, and it's functioning properly, that's a really important moment to be able to document as much as possible through photography, through video. We also want to document the process of actually installing it because a lot of these works are very complicated to install, so we want to record that as well. We also ask the artist for comprehensive installation instructions so they can give us what they think are the requirements for installing it.

[22:40] **Jonathan**: Joanna Phillips, who used to work at the Guggenheim as the conservator of time-based media, she also developed these reports called identity reports and iteration reports. The identity report talks about the identity of the artwork, like what's the permanent identity of it, and the iteration reports talk about each installation of it, so that's considered an iteration. In each iteration there's always some decision-making that happens, like how big is the room that it's going to be installed in or what's the lighting like or what projector is going to be used if it's projecting video or what speakers are going to be used if it's projecting audio, or if it's playing audio. All of those decisions get recorded in the iteration report and the reasons behind those decisions, so that's super important for documentation of these time-based media works, including software-based works.

[23:39] **Henry**: Right. This is all the context that we don't really think about, even just for regular software. No one's saying, "I was writing this code in this place at this time." It's just the code. It's like a very specific kind of version control of the way this was presented over time. Like, this was in a big room, not too tall room.

[24:00] **Jonathan**: Mm-hmm (affirmative). Then we look at, even ask the artist often, "Were you happy with this iteration, were you not happy with this iteration?", and they tell us why, and then that gets recorded and that's in our records for the artwork. A lot of times with a new artwork in the different iterations it actually starts to take on more of a kind of persistent identity, so we learn a lot about it in the first few iterations.

[24:34] **Henry**: Yeah, and I guess if we're thinking about preserving things for the long term, I feel like in a way maybe even I wonder if the artwork itself basically could change or the artists themselves might slowly change what they thought the core was through the process of working with you.

[24:50] **Jonathan**: Yeah, absolutely. That does happen sometimes. As conservators, it's our job to record as much as we can about that, about the changing of how the artist conceives it and things like that.

[25:08] **Henry**: I mention this a lot on all the podcasts I'm on now, but I've been reading this work by a philosopher called Michael Polanyi and he has this book that he's written called Personal Knowledge. There's a lot of stuff he talks about, but he talks about this concept of tacit knowledge, which is knowledge that you can't express but you know it, and the importance of people in knowledge and learning. I think in our current culture there's a lot of talk about separating the facts from people, the idea that you can just learn something and just insert it into your brain kind of thing.

[25:47] **Jonathan**: Like the Matrix or something.

[25:49] **Henry**: Like the Matrix. So his point was that ultimately, he would argue that you can't remove the information from the person that is providing it. So in this kind of art sense, it's like, well, if we were able to somehow mechanically figure out what is the artwork and then that person doesn't have to be there. But that's clearly not true.

[26:11] **Jonathan**: Right, of course.

[26:13] **Henry**: There's so much, we just talked about, there's so much there that you can't even begin to express what the artwork actually meant to that person.

[26:21] **Jonathan**: Right, yeah.

[26:22] **Henry**: I think that's really interesting.

[26:25] **Jonathan**: Yeah, there's no way we could just extract all of the artist's thoughts about a particular work. All we can best do is have a dialog and get their particular thoughts at a certain time, which are sometimes subject to change over time. But yeah, the best we can do is just record that and record... The technical things are obviously easier. We can make schematics, we can record videos of the artwork functioning. We can record videos with the programmer talking about the code. Those are the easy ones. The harder part is getting to thinking about what parts of this can be altered, what parts-

[27:19] **Henry**: What's not important, what matters to them.

[27:21] **Jonathan**: Sure, yeah.

[27:22] **Henry**: I guess maybe do you want to go into more detail on this idea of conservation and what are the steps that you take to save something for the long term?

[27:32] **Jonathan**: Yeah. I mentioned backups. One of the simplest ways is we have this floppy disk and then we have a method that's called disk imaging. I don't know if you ever heard of disk imaging, but a lot of times it's used by IT professionals to create backups of computers, and it's also used by forensic investigators to create copies of digital information as evidence in a court case. We use those same methods but we apply it to components of an artwork. Archives and libraries also use the same methods and they would apply it to disks that come in from someone's personal papers or something like that or hard drives that come in.

[28:30] **Jonathan**: So we have this floppy disk that has the files related to an artwork. We create a disk image with it, which is a file that's a bit for bit copy of everything that's on that disk, a perfect bit for bit copy. We verify that it's an actual copy and then we take that disk image file and then we save it in our repository. Then we get into just kind of basic digital preservation concepts, which is we have to take that file, we have to make redundant copies of it, and put those redundant copies in different places. Then we also have to check each of our copies periodically to make sure that no data has changed, there's no bit flipping or anything like that.

[29:22] **Henry**: Right. You use a hash or something like that?

[29:25] **Jonathan**: Yeah, we use check sums or hash values, yeah, to verify that no bits have changed.

[29:32] **Henry**: So that's the baseline. That was the thing that they gave you, and just want to make sure that that is preserved as is. Then moving forward, there's more like, "Oh, can we do something more?"

[29:45] **Jonathan**: Yeah. That's the baseline. Then we create rich documentation about that file, so we record what's the significance of that file. Let's say the significance is it's the executable file that runs the artwork, so we're going to record that somewhere. We're going to record, we have photos of course of the disk that it came from. We're going to record obviously that the disk image file came from that physical piece of media. So that's important to maintain that relationship. Then we can do sometimes some technical analysis, like let's say we're doing a disk image of an entire computer. We can do a technical analysis of what are all the files on that computer, and we may have to also identify which files on that computer are necessary to run the artwork. Then in addition we have to identify the dependencies. What's the operating system, are there any other software dependencies? Is it dependent on a certain computer and certain peripherals. That's the kind of rich documentation that we have to add as well. That's one way to think about the whole backing up process.

[31:04] **Jonathan**: Then in addition to backing up, then we also have to address stuff that's already failing. I mentioned our web artworks. We have three of them. The first one you mentioned Brandon in the Introduction by Shu Lea Cheang. That's from 1998. Then we have two other artworks from 2002, Unfolding Object by John F. Simon, Jr., the guy who also did Color Panel, and we have net.flag by Mark Napier. Again, as I mentioned, they're all supposed to be available for anyone who goes to the website.

[31:45] **Jonathan**: When I started my fellowship, these three works were already failing because you can imagine someone wrote HTML in 1998, it's not necessarily going to work in contemporary browsers. It was written for Netscape, basically. So at the beginning of my fellowship, Joanna and Deena had decided that we were going to take on Brandon as a case study and do a restoration of it.

[32:21] **Henry**: Because it was failing, you evaluated that that's necessary.

[32:24] **Jonathan**: Yeah. It was actually before I started my fellowship, there were NYU computer science students working under Deena who had already looked at the work and made an inventory of the parts that were not working anymore. Oh yeah, and that's of course another part of the rich documentation, is having some sort of reference for what does this thing look like when it's functioning properly. That's really important. We were able to gather some videos of Brandon while it was still functioning so we have that reference for, "Okay, it looks like this when it's working." When we did the restoration, of course, we looked at those videos and images as reference.

[33:03] **Henry**: Right, so that verification is important.

[33:06] **Jonathan**: Yeah. The students made a catalog of all the things that weren't working with Brandon, and then by the time I had started this restoration project had been kind of scoped out. Previously they had tried emulation. There were problems with that.

[33:28] **Henry**: How would that work for this case? Like running an old browser you mean?

[33:33] **Jonathan**: Emulation? Yeah, basically running it in an emulated old browser.

[33:37] **Henry**: Like you could use a VM or something.

[33:39] **Jonathan**: Yeah, and there were particular problems with that for this particular artwork. I know emulation does work for other artworks, it just wasn't working at the time in our case. The restoration team decided on a different approach, which was code migration. Brandon used a lot of Java applets. I don't know if you're familiar with Java applets.

[34:06] **Henry**: Yeah, Java applets, yeah.

[34:06] **Jonathan**: That was this old plugin technology that isn't supported on modern browsers anymore. Actually, I think Safari just recently stopped supporting it, I think the latest update. So we were basically racing against the clock.

[34:22] **Henry**: At the end, yeah.

[34:24] **Jonathan**: This was the end of 2016, beginning of 2017. A lot of browsers like Chrome didn't support applets, so a lot of pages of Brandon where an applet would be, if you looked at it in Chrome you just wouldn't see anything, so you were actually missing parts of the artwork. Also, it used a lot of outdated tags, like the blink tag. I don't know if you remember that one.

[34:46] **Henry**: Nice, blink tag. Yeah.

[34:49] **Jonathan**: So this is a case of we're talking about these committees that deprecate things. They probably said, "We don't like this tag anymore." Of course, they weren't necessarily thinking, "Oh, there are tons of artworks that use this tag." The blink tag was deprecated so parts of the website didn't blink anymore when they were supposed to.

[35:11] **Henry**: That's funny because I guess now you could make a blink tag using web components. Like I don't know if you know the term polyfilling.

[35:20] **Jonathan**: Polyfill? No.

[35:22] **Henry**: Basically it's usually the opposite, where if there is a new standard that's not actually standard yet, so before it's out, you can use it now and write kind of like the mock version of what it should be. Say there's a function that is going to be globally available, the whatever equals function, and you're substituting it. So you could do that for blink.

[35:46] **Jonathan**: Oh, I see. Yeah. We had a particular way we did it, which was our programmer Emma Dickson actually wrote a JavaScript function that went through the code and looked for the blink HTML tag, and then what it did was I believe she used CSS to basically make it appear and disappear.

[36:10] **Henry**: Oh cool, yeah. Right. She wrote her own then, basically.

[36:12] **Jonathan**: Yeah. She called it zombie code. It's like finding old code in there that doesn't work and then reanimating it.

[36:21] **Henry**: Oh yeah. We have legacy code everywhere, so this is pretty relevant stuff.

[36:29] **Jonathan**: With Brandon we decided we wanted to do this code migration, and the Java code from the Java applets would be rewritten in JavaScript. We were very conscious about we're not going to add any additional dependencies when we do this. We were actually taking away certain dependencies. For example, there was a part of it that used a database, but then the database was based on a certain live event that happened in '98 or '99, so of course that event isn't happening anymore so people aren't adding to the database so it's just static at this point. So instead of requiring that you have this SQL database, we just took the data out and were able to use JavaScript to work with that. We were taking away certain dependencies where we could and where it seemed appropriate for the artwork.

[37:33] **Henry**: Seems there's a lot of, there's the [inaudible 00:37:37] restrictions and what you're actually able to, like what language do you port it to and do you name things the same.

[37:44] **Jonathan**: Oh yeah, of course. We had very strict standards about that. For the museum, this was the first time that we were doing a conservation treatment on a software-based work, really, so we wanted to be very conscious of observing conservation ethics and being reversibility, you can undo the changes without harming the piece in any way, which is actually very easy for computer-based works because in terms of reversibility you just make a copy of the code and you never touch the original code and you can do whatever you want with this copy without hurting the original code. Reversibility and then also making clear any of our interventions, so separating out any interventions from the original. We accomplished this through tagging code.

[38:46] **Henry**: In your commits and stuff like that.

[38:48] **Jonathan**: Yeah. We used version control, we used Git.

[38:49] **Henry**: Version control.

[38:50] **Jonathan**: Yeah. Then we have clearly delineated what's original code, what's the code that Emma added, and anyone can basically look at that and see what we did in the code itself. Then also documentation. We wrote a treatment report basically of every intervention that we made and the reasons for it.

[39:15] **Henry**: Yeah, because I was going to ask earlier, and you answered it already, which was are there certain norms that you have and a code of ethics.

[39:24] **Jonathan**: Yeah, this was very new, so we were just kind of applying what we already knew, the methodologies we were already familiar with and just seeing how we could apply that to web artwork. Yeah, so reversibility, delineating the original from any interventions, and then also documenting any interventions. That was all really important. And also having documentation, like I said earlier, of the original before we made any interventions, so we have a reference of this is pre-restoration Brandon and then post-restoration Brandon. Typically in art conservation if a conservator is working on a sculpture, they take before and after pictures. They'll take a picture of this is what it looked like before I did my treatment and then this is what it looks like after my treatment.

[40:17] **Henry**: This reminds me a lot of in a company you might decide to rewrite your whole code base or do you modify the existing thing, and there's a point where you think this code sucks so badly that it's worth migrating. They're doing the same thing, and maybe [inaudible 00:40:36] kind of similar. They're always wondering is it worth starting over. Then it gets into this question of what should you conserve from the old code base, where it's like what about bugs? Do you fix the bugs while you're doing it or do you just make everything look the same and then fix it later, stuff like that.

[40:55] **Jonathan**: Yeah. There's also a concept in conservation called minimal intervention. You only intervene or make changes as much as is needed to fix the problem, almost kind of like if you think about a doctor. If you have a certain condition maybe the doctor's going to do surgery but maybe there's something before surgery that they can do, giving you drugs or something like that. That would be intervening only enough to solve the problem and nothing more. We try to practice that by saving as much of the original code as we could, so the code that still worked. A lot of programmers would like to start from scratch and just change it all, but of course we had to keep, our mandate was to keep as much of the original code as possible.

[41:55] **Jonathan**: I remember Deena said that often her students, her computer science students, are very vexed by this. They would rather in some cases just start over, but that just doesn't work for this project. If you're conserving artworks, you want to keep as much of the original as possible and then also if there are any kinds of technical changes that are really going to affect the artwork or what we think of as the artist's intent, the way that they programmed things, we're always going to loop in the artist to see how they would handle certain situations. Things like bugs. Nobody's perfect. There's sometimes things in there that one would consider bugs but you could also say that it's an inherent part of the artwork and that's how it was produced, and often it stays the same.

[42:59] **Henry**: Yeah, I think that's interesting.

[43:00] **Jonathan**: Because it's inherent to the artwork.

[43:01] **Henry**: Because it's like, it could be an opportunity to make it "better," but does that really, the same question.

[43:06] **Jonathan**: Yeah, that's generally not our mandate as conservators. In the case of Brandon, where when we were doing the code migration the whole idea was to make it look and feel as close to the original as we possibly could in terms of even down to this image is positioned with this many pixels on each side, and when you looked at that, we're going to keep it exactly in the same position. That becomes harder when you have multiple browsers and browser standards are changing all the time. It's something that for web artwork you have to have a way to keep evaluating whether it's still functioning properly.

[43:57] **Henry**: Exactly, yeah. I'm also reminded of the idea of refactoring too your own code. A lot of times when programmers, they rewrite their code to do the exact same thing, but then the code is different and it's more organized. A lot of times when people refactor, one of the principles I've heard of is you shouldn't do other things while you're doing that. So, "Oh, I can improve this thing here too," but then you start fixing things and it gets confusing to review and also to write. So I think it's a kind of similar idea of isolating that work and then doing other work later. But yeah, you just brought up this idea.

[44:35] **Jonathan**: Yeah, our purpose is not to make something better. It's to make it as faithful to the original as possible.

[44:43] **Henry**: Yeah, definitely different goals. I guess you just brought up that you might have different browsers, different environments you have to adhere to, and that reminds me of this idea in programming of testing. We have unit tests, integration tests, and it feels like if you want to preserve the artwork to what it originally was intended for, it would be nice to have some kind of automated way of knowing that it's "verified" or correct, versus just, "I took a picture, it kind of looks the same." If you're talking about pixels and stuff, right?

[45:21] **Jonathan**: Sure. I guess I should also add it's not always necessary that everything will be the same in terms of position and stuff like that. Sometimes depending on the artwork it might be a case of more like preserving the intent or the vision of the artist. In Brandon, visually we tried to keep it as similar as possible.

[45:43] **Henry**: Very similar.

[45:43] **Jonathan**: Yeah. In terms of the unit tests and any kind of automated testing, it's something that I thought about actually quite a few times in my fellowship. We should have some automated thing that alerts us if these websites are breaking. For example, Brandon had quite a few dead links that it had accumulated since 1998, and we had to figure out ways to redirect some of those links, again in consultation with the artist.

[46:15] **Henry**: Right. Are those to outside websites that are down, or internal, or what are the dead links then?

[46:20] **Jonathan**: Oh yeah. I think one of them was, one was an email address to an employee that no longer works at the Guggenheim, so we changed that to something else, a more general address for that department. Again, that seemed like a good compromise.

[46:43] **Henry**: Because otherwise I was thinking that those links, it's like do you backup those things on your own thing-

[46:49] **Jonathan**: Oh, do you backup other people's websites? Yeah. That was a possibility, using something like the Internet Archive's Wayback Machine to point to historical web pages. That was something that the artist didn't necessarily want to do. For example, there was one website that pointed to an organization that no longer exists so their website isn't up anymore. So what we did was for that organization we had it direct to... NYU's Fales Library has an archive of that organization's papers, so we actually decided to point that link to the archive of the organization's papers.

[47:34] **Henry**: A new website, okay.

[47:34] **Jonathan**: Yeah, so we changed that. Again, that was something that the artist, it was her suggestion and it seemed to make sense in that case. Yeah, I would love to hear ideas about ways to automate this type of monitoring, because if we could have a more regularly-scheduled way to look at things or an automated way to look at things, that would obviously save me a lot of time. I guess sometimes the problem is for links and stuff I feel like that could probably be automated, if links die, but in terms of I don't know if you can automate a way to look at different webpages and see is this looking right or is this, I guess-

[48:25] **Henry**: I don't know how you would do that either, other than if you did the whole specific pixels thing or you did screenshot testing, where you take a screenshot and then you compare it. Is it-

[48:35] **Jonathan**: Oh, with flex [inaudible 00:48:36] hashes or something.

[48:37] **Henry**: ... X percent different then you should look at it kind of thing. Then you could run a continuous integration service where it runs maybe it's every day.

[48:46] **Jonathan**: Yeah, that's a very interesting idea. You have screenshots, yeah.

[48:51] **Henry**: Because we do that now for websites in general. That's one way people are trying to figure out. They changed some kind of UI button and then is it different, or is it expected for it to be this way, and stuff like that.

[49:04] **Jonathan**: Great. What do you think about interactive artwork? Unfolding Object, I don't know if you played with it.

[49:12] **Henry**: I did.

[49:13] **Jonathan**: But you click on stuff and it unfolds and then it's counting how many people clicked on each facet.

[49:22] **Henry**: Right, every time someone clicks on it it adds another line, so it's always different.

[49:27] **Jonathan**: Mm-hmm (affirmative).

[49:28] **Henry**: I guess for that, that seems like more of a behavior thing. Is there a way to logically know that this line got added in or something like that. Which is funny because given that this is artwork, it's very unlikely, unless that person I guess knows a lot about engineering practices of them writing tests themselves, the artist doing it. It's funny because then you wouldn't have to retroactively add in tests, which is normal for any kind of legacy code base. But a lot of times, the current practice for a lot of people at companies, it's like, okay, or any open source project, right, you have your test while you write your code and then you can verify there's no regressions in the code base.

[50:10] **Jonathan**: Yeah. Actually I believe that that's something... We did a restoration of Unfolding Object as well, and then that was actually something that our programmer was looking at when he was writing his restoration code, was doing regression testing. He included a bunch of test scripts in our final version of it, so that someone in the future could go back and run the same tests.

[50:41] **Henry**: Yeah. It's funny. It reminded me of two things. One is I kind of wish, so Babel is a compiler for JavaScript, but if it was more true to its name, it actually converts any language to any other language, that would make this whole effort really easy, if there was somehow you take the language, you literally converts it to whatever language you want. That would be pretty amazing.

[51:05] **Jonathan**: Yeah. I think at certain times we've looked at certain tools, a tool to get Java to JavaScript, but since these are artworks, the degree of fidelity needs to be really precise.

[51:19] **Henry**: Pretty high.

[51:20] **Jonathan**: Yeah. In some cases, maybe even if there was a better way to do something in JavaScript we might not do it because we would just rather have it remain more faithful to the Java implementation.

[51:34] **Henry**: Right.

[51:36] **Jonathan**: So those kinds of automated tests, at least for artwork, or the kind of automated translation or migration, seems like it would be difficult for our case. I'm definitely not opposed to experimenting, but yeah, it seems like a very tough challenge.

[51:57] **Henry**: One of the interesting things about browsers is that JavaScript is the only language you can write in for a programming language. But the committee has been working on this new initiative called Web Assembly, which isn't really about the web and isn't really assembly, but that's what people say, technically you don't have to use it on the web because you can use it in node, and it's not really assembly. But it's a binary format where you can write all the other compilers to convert to this and then the browser will natively run that code. It is a way for not web projects but say someone wrote an artwork in C++ or something and you wanted to run it on a browser, you could compile that to Web Assembly and then run it in a browser to make it more accessible for everyone.

[52:41] **Jonathan**: Wow, that's cool. Okay, yeah.

[52:43] **Henry**: That could be an interesting thing to look into later, where you have all these different languages and if all these languages are able to support compiling to Web Assembly then that would be really great, so you don't have to run those other environments.

[52:58] **Jonathan**: Yeah, that's definitely something to look at in the future as it develops.

[53:03] **Henry**: I know most programmers like this because they don't want to write JavaScript. Just talking to you about this now, it kind of feels like a lot of it is very interdisciplinary.

[53:20] **Jonathan**: Oh, definitely, yeah.

[53:22] **Henry**: So now I'm curious, because in our intro you said you had a film degree for your undergrad, but then you didn't ever... Did you formally learn CS, because you have a software background too. You kind of need this to do any of this.

[53:38] **Jonathan**: Yeah, I didn't formally get a degree in computer science. Basically, I have my undergrad in film and I worked in the film industry for a little while working on a couple of reality shows and different things. I did video game testing for a little while.

[54:07] **Henry**: Like QA?

[54:07] **Jonathan**: Yeah, QA. So I did that for a little while. That's kind of where some of the software testing experience comes from.

[54:14] **Henry**: That's funny because the project I just did before this one was for the devs I made Slay the Spire, which is a Steam game. That's on Switch as well now. Their background was also QA, and then they're incorporating those kind of testing ideas into their game. It's a card game so they have to balance it and they use testing and data and all this stuff that they learned from their previous job.

[54:39] **Jonathan**: Oh cool, yeah. Yeah, I think having that experience with video game QA, it gives you a very particular mindset that I think is super helpful for any kind of work that I do now. If you're looking at software you want to look at not just how people are supposed to use it. Especially if we're putting an artwork on the web, you want to look at what are the edge cases, how are people going to abuse it, or how are people going to try and break it. That's some of what I bring too, if I'm testing restoration code.

[55:23] **Henry**: Right. I think that's the attitude in testing in general. It's not the normal case but those edge cases. Those are things you need to cover because the ones that are obvious you can manually know that they're fine, but then it's all the other things.

[55:37] **Jonathan**: Yeah, exactly. I remember in the game testing I did, you were supposed to run this way to complete the mission so you run the opposite way and see what happens, see if you can crash it. I had that experience, and then I had a number of other jobs, but when I was in Philadelphia I was working at this software company that did, basically they did web applications to help people apply for public benefits like food stamps and cash assistance and health insurance, Medicaid and stuff like that. They would create web apps for different states so that people could do these applications so they could do it in a less onerous way.

[56:30] **Jonathan**: Originally, I was working as a copy editor for the software company. Being an editor there, you have to go into the software and make all the changes and they use version control and things like that, so I was introduced to all that.

[56:45] **Henry**: So no formal training. You just kind of learned it on the job?

[56:49] **Jonathan**: Yeah. Learned it on the job and then I became friends with a lot of people who were programmers there.

[56:58] **Henry**: That's awesome.

[56:58] **Jonathan**: Yeah. Then I was laid off from that job and I was friends with one particular programmer and we decided, we were both out of a job, we decided we wanted to create a website, so I got a lot of experience in what it takes to build a website through doing that. We created it's called Veg Philly. We took it down maybe two years ago, but it was originally supposed to be a vegan restaurant guide for Philadelphia.

[57:27] **Henry**: Nice.

[57:30] **Jonathan**: Yeah, so I got a lot of experience through that, and then the same company that had laid me off previously, there was an opening for a programmer.

[57:43] **Henry**: The same company?

[57:43] **Jonathan**: The same company, yeah. Then my friend encouraged me to apply and they brought me on as a programmer. So I did that for a while and then I got interested in archives at the same time.

[58:00] **Henry**: Was there anything that happened?

[58:01] **Jonathan**: Yeah. Before I was brought back as a programmer at the software company, I was working at this community video center in Philadelphia called Scribe, and Scribe has, they've been making community documentaries for about the last, I think it's since the early '80s. So you have tons of tapes of these really, really interesting documentaries about different political issues, about different organizations within Philadelphia.

[58:32] **Henry**: In Philadelphia?

[58:32] **Jonathan**: In the city, yeah. They have all these tapes and at the time there wasn't necessarily a plan. This was back in 2013. There wasn't necessarily a plan in place to preserve all of this stuff and make it accessible to the public. They've done a lot of work since the but it was one of those things that inspired me. Like, "Oh, there's all this history."

[58:59] **Henry**: Stuff, content.

[59:00] **Jonathan**: Yeah, on tapes and on hard drives. At Scribe we started this informal archiving committee and then I started looking at video and film archiving, and then I'm like, "Oh, there's a graduate program at NYU that teaches this, so maybe I should do this program and learn how to preserve this stuff."

[59:25] **Henry**: That goes back to your bachelor's in film too.

[59:29] **Jonathan**: Exactly, yeah. When I went into the program I thought I would be a video archivist. That was kind of the vision, but I started to get more and more pulled toward digital preservation. I even in one of my internships I worked on this open source video digitization software called Vrecord, which people still use to digitize videotapes, so I was part of this development project. That was also helping my coding skills improve as well. Yeah, I just started to get more and more interested in computer history and I wrote my thesis on preserving computer viruses and other malware.

[01:00:17] **Henry**: Very interesting topic.

[01:00:18] **Jonathan**: Yeah. Which perhaps in a future episode we can get more into the meat of that research project. But yeah, I was really starting to get into the digital stuff, and when I graduated the Guggenheim posted this fellowship position and it just seemed like my skills really matched up well with what they were asking for. Then I had also been, the Guggenheim hosted a conference, this was my second year of grad school, called Tech Focus 3, and it was all about preserving software-based artworks. When I was there it was a real turning point, where I saw, oh, they want people who know how to use Git and know how to use command line and can make disk images and know about emulators. I had previously a lot of this background and experience and it just seemed like there were all these great connections. I met a lot of great people there, and it just seemed like I had a nice place there that I could really contribute to this field of computer-based art conservation.

[01:01:36] **Henry**: Yeah, the intersection of those two fields. Interesting. You said that you worked on an open source project.

[01:01:43] **Jonathan**: Yeah, mm-hmm (affirmative).

[01:01:46] **Henry**: I guess I'm also curious, I guess two different things. I had a question around, I mean, this is more of a... I think it's interesting that with this kind of more interactive art, and because the code is open, there is an opportunity for people to build off of that. We have this idea of remixing art and stuff like that versus with traditional art you wouldn't necessarily do that. Do you see that happening at all? That's not really your focus or anything, but.

[01:02:16] **Jonathan**: Yeah, I do see cases of artists, artists might take code that's in the public domain and use it in one of their artworks. I've definitely seen that. I've seen artists kind of encourage people to remix or reuse their code. There's definitely that as well.

[01:02:41] **Henry**: It's a little bit beyond simply you can fork a project, which a lot of open source is just tools. But with art it's like you can tweak little variables or parameters here and there that will look very different. I think even for just teaching and for kids, I think that's a really interesting opportunity too, because say Khan Academy, they have a lot of with processing and those kinds of languages it's all around the art of being able to tweak things and learn.

[01:03:09] **Jonathan**: Yeah. I mean, one thing with the restoration of Unfolding Object, it was important to the artist that the code be easily readable to anyone who goes to the site. One of the things we could have done would be to minify the JavaScript, and because the artist said, "No, I want people to be able to see this," we chose not to do that.

[01:03:37] **Henry**: That's interesting.

[01:03:40] **Jonathan**: Yeah. And then Brandon again we wanted to make everything that we did transparent so we have all the tags and the HTML about where the new code is and where the original code is.

[01:03:49] **Henry**: Yeah, I guess that's around accessibility. Then I wonder, well, the other option, you could just link to GitHub. I'm assuming you could put it on GitHub. Because minifying in the end is mostly around saving space, so I guess it depends on how you want to do that.

[01:04:09] **Jonathan**: Right. I was thinking with Brandon, part of Shu Lea Cheang's vision was that she wanted people to keep contributing to this website, so it's called Brandon, a one year narrative project in installments. Over the course of that year, she was holding events and she was collaborating with different artists and programmers, and artists were actually contributing to the site.

[01:04:32] **Henry**: During the time.

[01:04:33] **Jonathan**: During the time, yeah, during that one year and actually even a little bit after too. She had this part of the website called a panopticon, which is supposed to be like the panopticon prison. It's a prison where you have this central watchtower and you have all these cells on the outside. Shu Lea's idea was that you could have different artists kind of occupying the cells, so it was almost like an artist residency online where they would contribute GIFs or text or images to one of the cells. That would be their cell. That was one of the ways she encouraged people to contribute.

[01:05:18] **Jonathan**: Then also at one of the events you could, anyone who was attending the event could submit a headline and then those headlines were basically like scrolling.

[01:05:30] **Henry**: Oh, through the screen. Okay.

[01:05:31] **Jonathan**: Yeah, it was this event that was simulcast between New York and Amsterdam, so the Guggenheim Soho in New York and the De Waag Center in Amsterdam. It was basically this lecture. They had different speakers from each side, and so people were sending these headlines back and forth and sending images back and forth. I mean, for the time, for 1998, it was pretty novel. Now we think nothing of it, but this was kind of the beginning of these kind of simulcast events.

[01:06:08] **Henry**: I'm kind of curious now because there's obviously more and more artwork being created over time. I mean, I could ask the question what should we preserve or conserve and the answer's probably it would idealistically it would just be all of them. I guess I wonder how people can help with this kind of thing.

[01:06:29] **Jonathan**: Yeah, that's a good question.

[01:06:30] **Henry**: Because then the question is is it up to you and all the archivists to do all this work, or can people be involved? The question in open source is the same, where it's like as a maintainer is it our responsibility to provide this free software to all these developers and companies and do it for free?

[01:06:50] **Jonathan**: Yeah, I think in my case we have to deal with what's in our collection in terms of preserving it. Other museums deal with their collections, and then there's also this organization, Rhizome, that has their collection of mostly net art, and they're actually developing a lot of really interesting software to deal with some of the problems of preserving that art in their collection. They came up with Webrecorder, which is a piece of open source software that allows for interactive web archiving. A lot of web archiving software, it's automated. It'll just go out and it'll bring in the pages but for the modern web, you have a lot of different interactive stuff.

[01:07:42] **Henry**: Oh, dynamic stuff you mean.

[01:07:43] **Jonathan**: Yeah, and the web crawler doesn't know how to deal with that. So Rhizome created Webrecorder as a way to basically it's like a window and you're interacting with the website, and as you interact with it it's recording all the data that comes in, and then packaging that up in a web archive so you can access it later. So yeah, I would say the way that open source developers and software developers in general can really contribute to this I think in a great way is through developing tools. We try to use open source tools where available.

[01:08:24] **Jonathan**: Vrecord was a tool that was originally developed as part of the Open Source Committee of the Association of Moving Image Archivists, so we try to make it a tool by archivists for archivists. There's a lot of commercial software out there for digitizing video but it doesn't meet certain needs that we have, so that was the impetus for Vrecord, because we didn't want to be dependent on, "Oh, this version of Final Cut Pro doesn't do the thing we want it to do anymore." We were kind of striking out on our own. There have been a lot of people that have contributed to Vrecord, actually too many to name. I mean, the major developer has been Dave Rice at CUNY TV, and so my internship was at CUNY TV and I was working with Dave to add features to it. You can see it on GitHub.

[01:09:26] **Jonathan**: That's still being used, but things like you were talking about the type of automated testing stuff, I mean that would be a great tool for people who have to deal with a lot of web artworks, for example. Some way to look at screenshots and can you figure out if an artwork is functioning properly or not via screenshots or via other types of testing that's automated. We have a collection of three web artworks. Other people have collections of potentially hundreds of web artworks, and they want to figure out if they're working or not or figure out some way to intervene if they're not working, but they don't necessarily have the time to go through hundreds of websites.

[01:10:16] **Jonathan**: Yeah, I think tools is very important but with these open source tools that we use in the archival and conservation community, we also get into this problem of maintenance of these tools. Luckily, we have a lot of people who have institutional jobs and the institution supports them working on that particular piece of software, which is great. They have a stable job. They're not necessarily dependent on Vrecord being popular to keep their job.

[01:10:53] **Jonathan**: There's also MediaInfo, which is another open source software that's been super, super helpful for archivists and conservators, and what MediaInfo does is you feed a file into it and it gives you, usually a video or an audio file, it does image files as well, but you feed the file into it and it gives you all the technical metadata about that file. What's the resolution, what's the framerate, what's the duration, what codec is it in, things like that. But of course, yeah, we need ways to maintain that. I know in the case of MediaInfo, I don't remember exactly what the structure is around it, but I think there's kind of a core group around it, a couple of core developers, and then there's some institutional support. So different institutions that use this software can kick in a certain amount to keep it going.

[01:11:49] **Jonathan**: But I think, yeah, in terms of how outside programmers could help, definitely in terms of tools. Emulation tools would also be definitely an area where I think we need more development as well.

[01:12:05] **Henry**: Yeah, I would like to talk to someone that does that. That's something I don't know a lot about.

[01:12:09] **Jonathan**: Yeah, there's another big project called Emulation as a Service, or EaaS, and that's a really big project right now in archives and museums. There's this project called EaaSI, which is at Yale University currently, and it's a way of trying to make EaaS accessible to larger groups of people to mostly universities I think to try and use that emulation service to make different software they have in their collections accessible to the public or more generally accessible.

[01:12:50] **Jonathan**: So EaaS, the idea, it's like cloud-based emulation, so you basically just point someone to a URL and then they're just going to that URL but in the background there's a server spinning up an emulator and it's going to run whatever software you have loaded on there. Then the user is just going to see things in the browser window and they don't really have to set up the emulator or anything like that. It's really great for making an artwork. Could be an artwork, could be someone's personal papers, it could be an emulator with somebody's old computer that you can browse the files. Any of those things. It could be an old CAD drawing of a building. But making all that accessible through cloud-based emulation seems like a great initiative for archives and museums.

[01:13:54] **Henry**: Yeah, I think that might be a good place to end it.

[01:13:56] **Jonathan**: Okay.

[01:13:57] **Henry**: Was there anything else that you wanted to talk about or bring up that we didn't cover?

[01:14:02] **Jonathan**: I mean, there's always tons to cover but I think we covered quite a bit. Yeah, just wanted to thank you for having me as a guest. Also, as someone who uses a lot of open source software, I really do appreciate all of you maintainers out there who are working in the trenches often dealing with a thousand GitHub issues. Everybody thinks that they're going to get their issues solved in two seconds. Yeah, I can't imagine. I'm sure it's very challenging. But yeah, it's very necessary work.

[01:14:54] **Henry**: Cool. Well, thanks for joining me today.

[01:14:55] **Jonathan**: Yeah, sure.

[01:14:59] **Henry**: Thanks for listening. Check out our website, maintainersanonymous.com for show notes and transcripts. If you have any feedback, ideas, or guest suggestions, you can reach me on Twitter @left_pad. If you'd like to support the show, you can visit patreon.com/henryzhu.
