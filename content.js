const theDict = [
    { lie: "Microsoft", slopified: "Microslop" },
    { lie: "ChatGTP", slopified: "SlopGPT" },
    { lie: "Copilot", slopified: "Slopilot" },
];

// not case sensitive
const rules = theDict.map(({ lie, slopified }) => ({ regex: new RegExp(lie, "g"), slopified }));

function replaceText(node) {
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