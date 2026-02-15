export interface AssertionCuration {
  at: number;
  text?: string;
}

export interface OpenLoopCuration {
  at: number;
  text?: string;
}

export interface LexiconSeedCuration {
  term: string;
  anchors: number[];
}

export interface EpisodeLabCuration {
  slug: string;
  assertion?: AssertionCuration;
  openLoop?: OpenLoopCuration;
  lexicon?: LexiconSeedCuration[];
}

// Manual curation lives here so we avoid frontmatter bloat.
// Add entries episode-by-episode as you read transcripts.
export const HOME_LAB_CURATION: EpisodeLabCuration[] = [
  {
    slug: "checkpoint",
    assertion: {
      at: 2579,
      text: "There is no inevitability as long as there's a willingness to understand what is happening.",
    },
    openLoop: {
      at: 2393,
      text: "I just wonder how this can help nurture and recover people's creativity.",
    },
    lexicon: [
      { term: "amputation", anchors: [1692] },
      { term: "understanding debt", anchors: [1720] },
      { term: "cultivation", anchors: [2706] },
    ],
  },
  {
    slug: "unpacking",
    assertion: {
      at: 1470,
      text: "we're always trying to do things for God, but we should think about doing things with God.",
    },
    openLoop: {
      at: 348,
      text: "Do you think this is the central theme of Christianity, or is this the central theme of Christianity right now because of the time that we live in?",
    },
    lexicon: [
      { term: "optionality", anchors: [261, 311] },
      { term: "embodiment", anchors: [1195] },
      { term: "compounding", anchors: [722] },
    ],
  },
  {
    slug: "facade",
    assertion: {
      at: 1198,
      text: "Technology as a whole feels like a coping mechanism to not be able to deal with our problems.",
    },
    openLoop: {
      at: 892,
      text: "How should we think about what it means to be created in the image of God?",
    },
    lexicon: [
      { term: "shadow work", anchors: [2231] },
      { term: "legibility", anchors: [456, 1149] },
      { term: "self-sufficiency", anchors: [1856, 1949] },
    ],
  },
  {
    slug: "salience",
    assertion: {
      at: 6306,
      text: "There is this transcendent, holy mystery that we are part of and that we confront.",
    },
    openLoop: {
      at: 4188,
      text: "how do you talk about something that is outside of, or bigger than, or contains what you are?",
    },
    lexicon: [
      { term: "eucatastrophe", anchors: [2819] },
      { term: "indwelling", anchors: [2222] },
      { term: "ceaseless prayer", anchors: [63, 5463] },
    ],
  },
  // — Season 4 —
  {
    slug: "reality",
    assertion: {
      at: 1038,
      text: "It's not so much that reality answers your questions as that it explodes them. Reality really is in the driver's seat. So it walks in and takes over.",
    },
    openLoop: {
      at: 2161,
      text: "modernity is characterized by saying no, where we need to say yes. And actually there's a term for that. It's acedia, which is one of the seven deadly sins.",
    },
    lexicon: [
      { term: "indwelling", anchors: [917, 1242] },
      { term: "subsidiary-focal integration", anchors: [813, 952] },
      { term: "consent", anchors: [2110, 2192] },
    ],
  },
  {
    slug: "artificial",
    assertion: {
      at: 817,
      text: "In the physical world, you can be silent and present at the same time. We could be sitting in this room together, not talking, and there would be some benefit of shared human contact there, even though there was no quote unquote content.",
    },
    openLoop: {
      at: 2491,
      text: "it also feels like fake serendipity. Because someone clearly thought very hard about what you were going to encounter as you move through this environment.",
    },
    lexicon: [
      { term: "resilient", anchors: [1765, 1808] },
      { term: "trace", anchors: [2819, 2832] },
      { term: "waiting room", anchors: [2897, 2925] },
    ],
  },
  {
    slug: "feeling",
    assertion: {
      at: 2314,
      text: "we delight to praise what we enjoy because it doesn't just express what we like, but also completes the enjoyment. It is its appointed consummation.",
    },
    openLoop: {
      at: 1537,
      text: "Christianity itself could be looked at from that lens. Something that can seem kind of quaint and archaic from the outside, but from the inside it's just as fresh and alive as ever.",
    },
    lexicon: [
      { term: "obligation", anchors: [847, 866] },
      { term: "visceral", anchors: [1170, 2115] },
      { term: "layers", anchors: [1098, 2742] },
    ],
  },
  {
    slug: "hope",
    assertion: {
      at: 2249,
      text: "I really do think that the way that we help people to understand hope is not merely talking about hope. That's part of it, but we just need to live as hopeful people, right. We just need to show people.",
    },
    openLoop: {
      at: 1681,
      text: "how can we make this hope compelling for this generation?",
    },
    lexicon: [
      { term: "chain linked fence", anchors: [1663, 1782] },
      { term: "porous", anchors: [2301, 2323] },
      { term: "higher time", anchors: [698] },
    ],
  },
  {
    slug: "history",
    assertion: {
      at: 1793,
      text: "progress is not a thought of our civilization, it's the form of our civilization. So it's not a content that we think about. It's the way that we think.",
    },
    openLoop: {
      at: 1213,
      text: "there's obviously something to understand about how to live in history while living in the present that we really don't have as a possibility.",
    },
    lexicon: [
      { term: "necromancy", anchors: [1070] },
      { term: "complementarity", anchors: [872, 1943] },
      { term: "askesis", anchors: [2488] },
    ],
  },
  {
    slug: "charity",
    assertion: {
      at: 1845,
      text: "people are just individually irreplaceable. Engineering is about kinda getting rid of those differences in some sense. When you engineer a system, you try to make it replicable. You try to use pieces that are interchangeable.",
    },
    openLoop: {
      at: 1678,
      text: "in some sense, like I feel so brainwashed that like I have a hard time trying to understand the benefit.",
    },
    lexicon: [
      { term: "utilons and fuzzies", anchors: [577] },
      { term: "agentic", anchors: [1510] },
      { term: "holy inefficiency", anchors: [1702] },
    ],
  },
  {
    slug: "protestant",
    assertion: {
      at: 2008,
      text: "Everything now can just be a source of production, right? It has no integrity on its own terms except as a potential source of content.",
    },
    openLoop: {
      at: 2637,
      text: "Trying to figure out what is sidewalk life online. Does that exist?",
    },
    lexicon: [
      { term: "texture", anchors: [273, 819] },
      { term: "frictionless", anchors: [843, 989] },
      { term: "anchors", anchors: [894, 942] },
    ],
  },
  {
    slug: "communion",
    assertion: {
      at: 575,
      text: "what we think is clarity and accuracy is sometimes neutering the messiness of everything.",
    },
    openLoop: {
      at: 2392,
      text: "What is the equivalent to the word sin for a secular person?",
    },
    lexicon: [
      { term: "obsolescence", anchors: [60, 955] },
      { term: "percept", anchors: [676, 1559] },
      { term: "intertextual", anchors: [162, 210] },
    ],
  },
  {
    slug: "dorean",
    assertion: {
      at: 1348,
      text: "The right is not the copyright holders as though this were physical property. The right is anyone to whom the idea comes because once it has entered their head, it is now their idea as well.",
    },
    openLoop: {
      at: 601,
      text: "it's possible too that they're saying this isn't right co-labor, because you're not one of us. But I don't know. Anyway, this is one of the more finer points that I haven't worked out.",
    },
    lexicon: [
      { term: "co-laborer", anchors: [26, 385] },
      { term: "reciprocity", anchors: [73, 523] },
      { term: "dorean", anchors: [2, 1678] },
    ],
  },
  // — Season 3 —
  {
    slug: "legacy",
    assertion: {
      at: 1700,
      text: "Is there an adventure that lies ahead of you that is only accessible through faith? And is there a journey that's possible? And is there something beautiful about that thought or something beautiful that you get to through that adventure.",
    },
    openLoop: {
      at: 2295,
      text: "Why do people not conceive a faith as an adventure, or do they?",
    },
    lexicon: [
      { term: "legibility", anchors: [258, 504] },
      { term: "Chesterton's Fence", anchors: [545] },
      { term: "tripartite society", anchors: [632, 1042] },
    ],
  },
  {
    slug: "heritage",
    assertion: {
      at: 1305,
      text: "We deny completely the dimension of taking care the space we live. In a daily scale, we don't make it visible. We don't look for it. It's this blurry part of life on which we all depend.",
    },
    openLoop: {
      at: 1492,
      text: "Do you have in the field of coding, do you have sometimes this impression that before it was better? Are you already there?",
    },
    lexicon: [
      { term: "inhabiting", anchors: [324, 1337] },
      { term: "comfort", anchors: [832, 909] },
      { term: "right to repair", anchors: [1126] },
    ],
  },
  {
    slug: "process",
    assertion: {
      at: 762,
      text: "If you have a brain in a machine, how does it know what up and down is? And left and right, and front and back, and heavy and light? And the experience of having a body? If it doesn't have that, like it isn't capable of understanding human thought and rationality and cognition like on a fundamental level. That's a conversation that never happens in AI.",
    },
    openLoop: {
      at: 455,
      text: "I wonder when we're going to start seeing burn out on digital gardening, because it's such a fun thing now, but are you responsible?",
    },
    lexicon: [
      { term: "process knowledge", anchors: [106, 1821] },
      { term: "affordances", anchors: [183, 1677] },
      { term: "Protestant work ethic", anchors: [1003, 1104] },
    ],
  },
  {
    slug: "illich",
    assertion: {
      at: 1182,
      text: "How do I refuse the framing that modern technological culture offers to me, of being the one who will master and control the world. The one who sees the world as raw material for my own projects.",
    },
    openLoop: {
      at: 1996,
      text: "And so this focus on how we outsource our embodied experience of the world through tools that then interrupt our senses' direct contact with the world or displace it. I've been very curious about that.",
    },
    lexicon: [
      { term: "deskilling", anchors: [670, 729] },
      { term: "counterproductivity", anchors: [2302, 2342] },
      { term: "conviviality", anchors: [1380, 1463] },
    ],
  },
  {
    slug: "shalom",
    assertion: {
      at: 1044,
      text: "there's equal glory in you being a garbage woman that there is in you being like a pastor, a theologian, or like a great nonprofit worker",
    },
    openLoop: {
      at: 1270,
      text: "you can't sort of like deconstruct the church and recreate it in other spaces, which is a popular idea. Some people are like, what if you just take worship, what if you just take the community aspects? How can you recreate just community without believing in God? And I think it's really hard to explain all of the parts, how they fit together perfectly, but you can't reverse engineer any of it.",
    },
    lexicon: [
      { term: "habituation", anchors: [1991, 2050] },
      { term: "shalom", anchors: [3218, 3258] },
      { term: "sub-creators", anchors: [3218, 3327] },
    ],
  },
  {
    slug: "embodied",
    assertion: {
      at: 1077,
      text: "Singing a hymn that has been sung for thousands of years and you think, Oh, well, you know, it has no meaning to me, let's just not do it anymore. You're not making space for what maybe it can like teach you that you aren't consciously aware of.",
    },
    openLoop: {
      at: 1480,
      text: "And I wonder if then transhumanism is some sort of reaction to maybe some of the more traditional religious beliefs.",
    },
    lexicon: [
      { term: "indwelling", anchors: [10, 125] },
      { term: "hybrid objects", anchors: [595, 599] },
      { term: "robustness", anchors: [599, 1393] },
    ],
  },
  {
    slug: "essence",
    assertion: {
      at: 2373,
      text: "I don't think of a material reality as being like distinct from religious reality. It's just all the same thing. Maybe that's one of the things that is so intoxicating about Christianity and about faith is like becoming part of this integrated whole.",
    },
    openLoop: {
      at: 1632,
      text: "When language was evolving, it's not like someone sat down and thought like, okay, I'm going to design a form so that we can, you know, talk about things. Like all of these like notions of what language is and what it does and what it's for and how it transforms us and how we transform it, all of this comes after language.",
    },
    lexicon: [
      { term: "indwelling", anchors: [1956, 2404] },
      { term: "porous", anchors: [768, 1343] },
      { term: "individuation", anchors: [863, 923] },
    ],
  },
  {
    slug: "tetris",
    assertion: {
      at: 184,
      text: "Losing at Tetris is basically the state of software right now where blocks are just falling into place. We don't have time, we don't have the resources to put them in the right place, so they just kind of pile up and there's kind of an explosion of kind of arbitrary complexity.",
    },
    openLoop: {
      at: 1202,
      text: "We sort of deliberately create a sort of shifting sands that we then build on. It's kind of hilarious when you look at it from that distance.",
    },
    lexicon: [
      { term: "radical monopoly", anchors: [1165, 1397] },
      { term: "iatrogenesis", anchors: [531, 1735] },
      { term: "conviviality", anchors: [592, 2118] },
    ],
  },
  {
    slug: "reconversion",
    assertion: {
      at: 1765,
      text: "A not insignificant part of coming back to religion for me was feeling this like insufficiency of rationalism, where I felt like it really wasn't actually answering all of my questions or some of the answers felt really like incomplete, unsatisfying.",
    },
    openLoop: {
      at: 1953,
      text: "I feel like you might be into it. Like givenness makes me think of happeningness. That something can exist because of the interaction of various processes. And then it becomes sort of more than the sum of the parts.",
    },
    lexicon: [
      { term: "fractal", anchors: [860, 1993] },
      { term: "happeningness", anchors: [1953, 2032] },
      { term: "duty", anchors: [196, 747] },
    ],
  },
  {
    slug: "convivial",
    assertion: {
      at: 161,
      text: "One of the threats of modern tools and modern institutions is that they teach us to depend upon the products that they offer or the services they render, instead of our neighbor. Instead of another person, right, another human being. So we lose the capacity, to not just take responsibility for ourselves, but to care for one another, in this context.",
    },
    openLoop: {
      at: 942,
      text: "To simply look at the world is not to see it. And so we need to learn to see, and part of that I think involves the learning to name the world.",
    },
    lexicon: [
      { term: "conviviality", anchors: [23, 190] },
      { term: "deskilling", anchors: [114, 135] },
      { term: "subsidiary-focal integration", anchors: [1073, 1117] },
    ],
  },
  {
    slug: "disembodiment",
    assertion: {
      at: 646,
      text: "Ideally, we would know ourselves, like when we feel anything. When I feel emotions, when I feel like my body needs food or whatever, right. And then you could see a moment where like the app will tell me everything and then I won't need to rely on my own sense of feeling.",
    },
    openLoop: {
      at: 1368,
      text: "We have no affordances that suggest presence without noise.",
    },
    lexicon: [
      { term: "radical monopoly", anchors: [372, 582] },
      { term: "quantified self", anchors: [605, 667] },
      { term: "co-presence", anchors: [1347, 1425] },
    ],
  },
  {
    slug: "limits",
    assertion: {
      at: 1168,
      text: "The proposition that there should be limits is a kind of modern heresy. It goes against something I think, deeply ingrained in Western modernity.",
    },
    openLoop: {
      at: 1595,
      text: "And I wonder to what degree, to reflect on this from a theological perspective, if that is a function of just coming to see that this is sort of it, right? This is the one shot you get at life. And so the only thing to do is to extend it indefinitely.",
    },
    lexicon: [
      { term: "threshold", anchors: [910, 1019] },
      { term: "counterproductivity", anchors: [1421, 1019] },
      { term: "memento mori", anchors: [1687, 1741] },
    ],
  },
  {
    slug: "silence",
    assertion: {
      at: 1465,
      text: "Do I live in such a way that I am prepared to be surprised? By my circumstances, by the world, by people. But if I only ever think about my self given goals, right? The goals I give myself to accomplish. You're inhabiting the world in such a way that you're not able to see what may be there. The gifts that might be there, right in your path.",
    },
    openLoop: {
      at: 3024,
      text: "A commons is a space which is established by custom. It can not be regulated by law. The law would never be able to give sufficient details to regulate a commons.",
    },
    lexicon: [
      { term: "radical monopoly", anchors: [1557, 1616] },
      { term: "askesis", anchors: [2193, 2209] },
      { term: "strategic silence", anchors: [237, 320] },
    ],
  },
  {
    slug: "overparticipation",
    assertion: {
      at: 606,
      text: "Imagine trying to collaborate with your comment section is kind of like at the heart of why this stuff is so challenging.",
    },
    openLoop: {
      at: 1089,
      text: "It feels like it's completely inverted, where a maintainer doesn't always have authority over their projects when something happens. You can just get this flood of people from the outside who are coming in.",
    },
    lexicon: [
      { term: "stadium", anchors: [301, 359] },
      { term: "over-participation", anchors: [36, 641] },
      { term: "dark forest", anchors: [1720, 2688] },
    ],
  },
  {
    slug: "emotional",
    assertion: {
      at: 362,
      text: "I think emotions are a big deal in programming. Like I think most of the work in programming is managing your own feelings about it.",
    },
    openLoop: {
      at: 1921,
      text: "I think I want to play around more with like really fine grain open source. That's where it is sort of at the line of code level or the cell level with a spreadsheet.",
    },
    lexicon: [
      { term: "tractability", anchors: [1608, 1645] },
      { term: "tyranny of lists", anchors: [77, 80] },
      { term: "task switch", anchors: [1951, 2006] },
    ],
  },
  {
    slug: "advent",
    assertion: {
      at: 384,
      text: "These rituals again, they're not things that we just do alongside our active remembrance. They themselves are the remembrance. It's a memorial that causes us to remember.",
    },
    openLoop: {
      at: 1957,
      text: "Advent is about putting ourselves into the story of preparation waiting that happened way before we were even born. Advent is a story of Israel preparing and waiting for the coming of Jesus, whom they may not have known until he actually came.",
    },
    lexicon: [
      { term: "cognizantly ritualistic", anchors: [829, 1376] },
      { term: "portal", anchors: [928, 976] },
      { term: "spiral", anchors: [1106, 1127] },
    ],
  },
  {
    slug: "tabfs",
    assertion: {
      at: 654,
      text: "A good project idea comes out of some kind of personal history or personal relationship that you have with the concepts or with the system. It's something that not anybody could just come up with and try.",
    },
    openLoop: {
      at: 1511,
      text: "That's where a lot of my attention I want to go. And so I wonder if I haven't documented that part enough, or if I need to have more structures to support that. Or maybe people just don't have new ideas about what to do there.",
    },
    lexicon: [
      { term: "boilerplate", anchors: [294, 362] },
      { term: "synthetic file system", anchors: [1193, 1484] },
      { term: "literate documentation", anchors: [1042, 1082] },
    ],
  },
  {
    slug: "online",
    assertion: {
      at: 223,
      text: "The sort of turn, which I think is phenomenologically true, towards a kind of intuitional model of understanding. Sort of trusting your gut, rejecting external, believing that your desires are kind of ontologically good. All of these things are kind of natural, normal, and even rational responses to a broader question, which is you can't trust anybody else.",
    },
    openLoop: {
      at: 3738,
      text: "What do we do with our freedom? How do we, in an era where human creative powers are so visible, where we are more and more divorced from givenness, facticity, and Nature, how do we manage that?",
    },
    lexicon: [
      { term: "givenness", anchors: [872, 3738] },
      { term: "intuitional", anchors: [12, 223] },
      { term: "remixing", anchors: [555, 614] },
    ],
  },
  // — Season 2 —
  {
    slug: "metaphor",
    assertion: {
      at: 1250,
      text: "When the program dies, it's not when the program doesn't work, it's when the people don't understand how it works.",
    },
    openLoop: {
      at: 1979,
      text: "All dirt is contextual. It all just depends on where we draw the boundaries.",
    },
    lexicon: [
      { term: "cognitive metaphor", anchors: [160, 736] },
      { term: "subsidiary-focal integration", anchors: [2700, 2709] },
      { term: "dead metaphors", anchors: [2233] },
    ],
  },
  {
    slug: "gift",
    assertion: {
      at: 2144,
      text: "Patreon in a way is running under the guise of being a gift economy. All their marketing language and the way they pitch themselves is very much that we are supporting the new internet gift economy, but on the actual functional level they are pure market economy.",
    },
    openLoop: {
      at: 425,
      text: "If the thing that makes gift exchange means something to us, if we lose that direct social relationship, that's what threatens it maybe. That's what makes the economy not quite function the way we wish it would.",
    },
    lexicon: [
      { term: "no free gift", anchors: [488, 1290] },
      { term: "balanced reciprocity", anchors: [587, 628] },
      { term: "disembodiment", anchors: [2782, 2955] },
    ],
  },
  {
    slug: "growing-old",
    assertion: {
      at: 1646,
      text: "I think developing these core skills opens up new things. It pushes the frontier outward of what the possibilities of what you can possibly do.",
    },
    openLoop: {
      at: 3357,
      text: "Before you maintain anything, you got to maintain yourself and your health.",
    },
    lexicon: [
      { term: "gulf of execution", anchors: [959, 1955] },
      { term: "spontaneous collision", anchors: [2477, 2565] },
      { term: "sustainability", anchors: [3554, 3605] },
    ],
  },
  {
    slug: "digital-death",
    assertion: {
      at: 1791,
      text: "For them the small scale is the only scale.",
    },
    openLoop: {
      at: 698,
      text: "It's like, once you're on that train, you're getting a regular dose.",
    },
    lexicon: [
      { term: "spewing undirected", anchors: [1449, 1501] },
      { term: "tuneness", anchors: [1285, 1321] },
      { term: "life after death", anchors: [9, 591] },
    ],
  },
  {
    slug: "uptime",
    assertion: {
      at: 2675,
      text: "Our purpose is not to make something better. It's to make it as faithful to the original as possible.",
    },
    openLoop: {
      at: 675,
      text: "As conservators and archivists, we're kind of tethered to these technologies that we don't have much control over. We can't tell Firefox, don't deprecate this thing because this artwork depends on it.",
    },
    lexicon: [
      { term: "iteration report", anchors: [1360, 1440] },
      { term: "minimal intervention", anchors: [2455, 2508] },
      { term: "zombie code", anchors: [2161, 2181] },
    ],
  },
  {
    slug: "getting-old",
    assertion: {
      at: 1383,
      text: "We don't know how software gets built. It just happens.",
    },
    openLoop: {
      at: 3183,
      text: "I don't even know where even something as big as NPM shakes out in that.",
    },
    lexicon: [
      { term: "papering over deficiency", anchors: [3002, 3037] },
      { term: "being there first", anchors: [3550, 3595] },
      { term: "innersource", anchors: [1393, 1415] },
    ],
  },
  {
    slug: "open-knowledge",
    assertion: {
      at: 1375,
      text: "Open source code is better than closed source code because there's more people looking at it. It's easy to contribute. You know, open source has clearly eaten software, right. But the way that we treat our knowledge is very close source.",
    },
    openLoop: {
      at: 951,
      text: "And I'm looking for that. I haven't found that yet.",
    },
    lexicon: [
      { term: "tummling", anchors: [2, 54] },
      { term: "meta-language", anchors: [2083, 2089] },
      { term: "learning gears", anchors: [872, 891] },
    ],
  },
  {
    slug: "value",
    assertion: {
      at: 881,
      text: "If what you care about is having a big impact on the world, the business skills arguably did that just as much as the code. People don't just use things because they're out there.",
    },
    openLoop: {
      at: 2241,
      text: "And you might change so much that you don't want to give back in the way that you used to.",
    },
    lexicon: [
      { term: "perceived value", anchors: [6, 77] },
      { term: "champion", anchors: [2752] },
      { term: "price psychology", anchors: [1550, 3155] },
    ],
  },
  {
    slug: "speedrunning",
    assertion: {
      at: 243,
      text: "You have a game that's kind of its own scientific field, where it's completely unknown at the start, it's a black box, but you can gradually start to pick away and find out what's going on with it.",
    },
    openLoop: {
      at: 919,
      text: "What's going to happen more and more is basically people do what they want, they get their run and then they move on. And if there's nothing beyond the run - and in some cases the run might even disappear - that just means that everyone else has to start from square one.",
    },
    lexicon: [
      { term: "routing", anchors: [203, 1403] },
      { term: "TAS", anchors: [2869, 3022] },
      { term: "black box", anchors: [243] },
    ],
  },
  {
    slug: "boundaries",
    assertion: {
      at: 967,
      text: "Being firm allows you to not have that pent up aggression and be kinder overall.",
    },
    openLoop: {
      at: 1288,
      text: "What's your leverage? He was like, Gosh, I don't know. It's like, Can you stop maintaining it for a while? Can you not respond speedily to people? He was like, Oh, God. I can't do that. I was like, If you're not willing to do that, making money is going to be very hard.",
    },
    lexicon: [
      { term: "boundaries", anchors: [609, 2663] },
      { term: "leverage", anchors: [1288, 2335] },
      { term: "pitching", anchors: [1820, 1971] },
    ],
  },
  {
    slug: "unlisting",
    assertion: {
      at: 1754,
      text: "By just kind of quitting you just free up your mind. They were known for Seinfeld obviously, but they also had a bunch of stuff afterwards. So I find that's pretty admirable.",
    },
    openLoop: {
      at: 2337,
      text: "I think that having role models for people who've done this without any sort of crisis, right? You hear about these detox things like, Oh yeah, I'm like addictive gambler or addicted to social media. And it ruined my life.",
    },
    lexicon: [
      { term: "unlisting", anchors: [389, 415] },
      { term: "intentionality", anchors: [2337, 2402] },
      { term: "friction", anchors: [2617, 2650] },
    ],
  },
  {
    slug: "standards",
    assertion: {
      at: 3334,
      text: "People are the hardest part of software. The way I have been thinking about this for a while now is like, how can we solve the human interoperability problem, which will help improve a lot of our technical interoperability problems.",
    },
    openLoop: {
      at: 2145,
      text: "I've been thinking a lot lately about how we have a lot of open source projects and things that have, especially in the last 10 years, that got super popular and then just like that they were passe. But we've got all these applications, we've got all these sites using them. So there's like this sort of, the analogy I have been describing is sort of like a garbage dump.",
    },
    lexicon: [
      { term: "interoperability", anchors: [548, 3334] },
      { term: "succession planning", anchors: [2145, 2327] },
      { term: "emeritus", anchors: [2501, 2504] },
    ],
  },
  {
    slug: "preservation",
    assertion: {
      at: 1943,
      text: "That emotional reaction to technology, whether it's a digital file or a piece of software or a piece of hardware or whatever is really fascinating. It makes me hopeful, I think, for the future of how people will value their archives.",
    },
    openLoop: {
      at: 969,
      text: "the thing that we want to preserve isn't just that artifact itself, and not even just metadata, but almost the process, the culture of that project.",
    },
    lexicon: [
      { term: "appraisal", anchors: [762] },
      { term: "significant properties", anchors: [2178] },
      { term: "context", anchors: [2054, 2099] },
    ],
  },
  {
    slug: "freedom",
    assertion: {
      at: 2628,
      text: "the nice thing about it being an open source project is we don't really have... we're not working for survival. I think that's the key. We don't have a burn rate, we don't have a runway. That relieves us from having to always rush.",
    },
    openLoop: {
      at: 2783,
      text: "if you want to talk about game theory, it's like an infinite game. You're like playing to not win, you're just playing to keep going forever.",
    },
    lexicon: [
      { term: "lifestyle entrepreneurship", anchors: [1099] },
      { term: "product mindset", anchors: [5095, 5130] },
      { term: "greenfield", anchors: [4101] },
    ],
  },
  {
    slug: "games",
    assertion: {
      at: 896,
      text: "I think that it's foolish to try to make a game that pleases everyone and then you're just not doing a good job of pleasing the ... you can make everyone kind of like your game, but then you won't have people that just absolutely love it.",
    },
    openLoop: {
      at: 2980,
      text: "displaying information and being open in a strategy game is I think an interesting thing that's probably underutilized with the current moment.",
    },
    lexicon: [
      { term: "mastery", anchors: [103, 163] },
      { term: "mental heuristics", anchors: [1077, 1184] },
      { term: "intent system", anchors: [2829, 2893] },
    ],
  },
  {
    slug: "nostalgia",
    assertion: {
      at: 759,
      text: "I can't make a Windows 98 that's not accessible. I can't do it. That would be disgusting of me.",
    },
    openLoop: {
      at: 2107,
      text: "Is it done? Maintenance, what's that even going to look like? How do you maintain something that feasibly the button borders should look like they do now in five years?",
    },
    lexicon: [
      { term: "pixel perfect", anchors: [136, 2874] },
      { term: "satire at no one's expense", anchors: [4028, 4212] },
      { term: "commit access", anchors: [1676, 1769] },
    ],
  },
  // — Season 1 —
  {
    slug: "inefficiency",
    assertion: {
      at: 1856,
      text: "To be in a relationship is actually to be inefficient.",
    },
    openLoop: {
      at: 1485,
      text: "I think there's something special or interesting about not knowing and maybe never really understanding completely, but knowing it truly and that we can know, but we might not know exhaustively.",
    },
    lexicon: [
      { term: "church hopping", anchors: [322, 501] },
      { term: "holy inefficiency", anchors: [1636, 1788] },
      { term: "discernment", anchors: [1334] },
    ],
  },
  {
    slug: "authority",
    assertion: {
      at: 1156,
      text: "People don't really understand why they believe what they believe, or they forgot about it because it becomes just like a what you do.",
    },
    openLoop: {
      at: 1096,
      text: "It almost seems like it comes out of nowhere, but it had been silently building for a long time. And I think it happens a lot with like leadership change in open source, too.",
    },
    lexicon: [
      { term: "intrinsic motivation", anchors: [371, 409] },
      { term: "Priesthood of All Believers", anchors: [102] },
      { term: "exit versus voice", anchors: [1524] },
    ],
  },
  {
    slug: "trust",
    assertion: {
      at: 2058,
      text: "You have people that are unpaid, that probably most maintainers are accidental. They didn't have experience in maintaining before. And yet, somehow you actually are able to make things happen. And in that sense this is almost surreal in a way.",
    },
    openLoop: {
      at: 1652,
      text: "When does it make sense to encode trust versus just trying to trust people and accept that sometimes you're gonna be wrong?",
    },
    lexicon: [
      { term: "mustard seed", anchors: [1811, 1869] },
      { term: "spiritual formation", anchors: [425] },
      { term: "on-chain governance", anchors: [1306, 1352] },
    ],
  },
  {
    slug: "faith",
    assertion: {
      at: 1838,
      text: "God already loves you, so you shouldn't have to work to get his approval, but because he loves you, you work. You're doing it out of a sense of joy or love already, instead of trying to gain it.",
    },
    openLoop: {
      at: 1886,
      text: "if you do that sort of self-inquiry, and you realize that this isn't bringing you the joy that you wish it did, do you think... There's two paths, right? You step away, or you change what you're doing so that it does bring back that sense of joy.",
    },
    lexicon: [
      { term: "restorative", anchors: [136, 257] },
      { term: "liturgy", anchors: [1547] },
      { term: "tithing", anchors: [900, 992] },
    ],
  },
  {
    slug: "myth",
    assertion: {
      at: 1960,
      text: "tradition is also like participatory. You have to connect to it or else it doesn't really work. You have to actually feel like you are carrying something on and feel like ownership in whatever that thing is, otherwise it's just meaningless.",
    },
    openLoop: {
      at: 1314,
      text: "I wonder if there is like an optimal time for a maintainer to step down or not- just in terms of like the trajectory of the life of the project.",
    },
    lexicon: [
      { term: "BDFL", anchors: [910, 1102] },
      { term: "symbolism", anchors: [641, 757] },
      { term: "lore", anchors: [241] },
    ],
  },
  {
    slug: "membership",
    assertion: {
      at: 1428,
      text: "it's not because I'm devoted that I'm going. It's 'cause going will make me more devoted as well. Same with open source. Continuing to do it will make me continue to want to do it.",
    },
    openLoop: {
      at: 1357,
      text: "When you're too authoritarian, then people are unhappy. But then if you go too far on the other side, you find that it becomes really overwhelming to cater to the needs to lots of people who might not necessarily be that committed.",
    },
    lexicon: [
      { term: "covenant", anchors: [227] },
      { term: "seeker-friendly", anchors: [59] },
      { term: "intangible", anchors: [1210] },
    ],
  },
  {
    slug: "liturgy",
    assertion: {
      at: 1009,
      text: "through the practice of doing open source I learned to love it more.",
    },
    openLoop: {
      at: 1329,
      text: "how would you start a new shared habit, and then kinda like more importantly, how do you know that the habit you personally want is a good habit",
    },
    lexicon: [
      { term: "liturgy", anchors: [9, 1488] },
      { term: "the medium is the message", anchors: [1252] },
      { term: "embody", anchors: [759, 1488] },
    ],
  },
  {
    slug: "city",
    assertion: {
      at: 274,
      text: "They substituted a living, very sophisticated, rich and subtle order, with something that was visually flashy and comprehensible, but that was outside of time and therefore dead.",
    },
    openLoop: {
      at: 2374,
      text: "how do you know when you're dealing with an artifact versus dealing with like a living organism?",
    },
    lexicon: [
      { term: "organized complexity", anchors: [1505, 1673] },
      { term: "fractal", anchors: [556, 954] },
      { term: "the work of the people", anchors: [647, 708] },
    ],
  },
  {
    slug: "motivation",
    assertion: {
      at: 107,
      text: "If it's not ever done or there's always something else I could be doing, then how do I find a way to find my own inner quiet and be able to stand still and say, I'm doing this for me and not because I'm chasing after whatever extrinsic reward there is.",
    },
    openLoop: {
      at: 1506,
      text: "how do you know, either in a faith or open source context, when someone isn't just sort of there to do their thing and leave.",
    },
    lexicon: [
      { term: "fear-driven development", anchors: [1004, 1040] },
      { term: "inner quiet", anchors: [107] },
      { term: "bearing witness", anchors: [521, 602] },
    ],
  },
  {
    slug: "evangelism",
    assertion: {
      at: 786,
      text: "If you don't actually truly believe it yourself and live it out, then how are you gonna be able to like show or convince that in anyone else?",
    },
    openLoop: {
      at: 1854,
      text: "I really try not to use that word unless I'm feeling lazy because it sets off so many different ideas in someone's head about what it means.",
    },
    lexicon: [
      { term: "proselytizing", anchors: [173, 183] },
      { term: "meeting them where they're at", anchors: [473] },
      { term: "testimony", anchors: [903, 943] },
    ],
  },
  {
    slug: "money",
    assertion: {
      at: 948,
      text: "The point of the tithing is to help people but it's also to help yourself. It's an opportunity for you to kind of act out that belief that your money is not yours.",
    },
    openLoop: {
      at: 2489,
      text: "You wanna sustain yourself but then you're like, should I limit how much that I make? I felt like that a lot when I was trying to raise money on Patreon where you feel bad that people are giving you money but you should feel free but you don't. You almost feel trapped.",
    },
    lexicon: [
      { term: "stewarding", anchors: [2075, 2099] },
      { term: "fork", anchors: [399] },
      { term: "cheerful heart", anchors: [639] },
    ],
  },
  {
    slug: "haircut",
    assertion: {
      at: 1324,
      text: "We want to treat everything like a robot or a program because it's easy to reason about those things. But reality is so complicated that it actually makes more sense to treat it as living.",
    },
    openLoop: {
      at: 1504,
      text: "Knowing God versus knowing about God.",
    },
    lexicon: [
      { term: "testimony", anchors: [1120, 1206] },
      { term: "creative minority", anchors: [210] },
      { term: "embodiment", anchors: [1573] },
    ],
  },
];

export const HOME_LAB_CURATION_BY_SLUG = new Map(
  HOME_LAB_CURATION.map((entry) => [entry.slug, entry]),
);
