const theDict = [
    { lie: "Microsoft", slopified: "Microslop" },
    { lie: "ChatGPT", slopified: "SlopGPT" },
    { lie: "Copilot", slopified: "Slopilot" },
    { lie: "Artificial Intelligence", slopified: "Artifical Incompetence" },
    { lie: "AI", slopified: "Artifical Incompetence" },
    { lie: "AI generated", slopified: "AI slop" },
];

// not case sensitive, ignores characters that are parts of words
const rules = theDict.map(({ lie, slopified }) => ({ regex: new RegExp(`\\b${lie.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), slopified }));

function isNotToBeTouched(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
        node = node.parentElement;
    }
    return node && (
        node.tagName === 'INPUT' ||
        node.tagName === 'TEXTAREA' ||
        node.isContentEditable
    );
}

function replaceText(node) {
    // ignore user input fields
    if (isNotToBeTouched(node)) return;

    if (node.nodeType === Node.TEXT_NODE) {
        let liesAndDecit = node.nodeValue;
        let slopifiedText = liesAndDecit;

        for (const i of rules) { slopifiedText = slopifiedText.replace(i.regex, i.slopified); }

        if (slopifiedText !== liesAndDecit) { node.nodeValue = slopifiedText; }
    } else {
        for (const child of node.childNodes) { replaceText(child); }
    }
}

replaceText(document.body);

// dynamic replacements (i hope this works)
const observer = new MutationObserver(mut => {
    for (const i of mut) {
        for (const j of i.addedNodes) {
            replaceText(j);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });