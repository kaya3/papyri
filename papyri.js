var animationTime = getComputedStyle(document.body).getPropertyValue('--animation-time');

function selectorForEach(root, selector, f) {
	var nodes = root.querySelectorAll(selector);
	for(var i = 0; i < nodes.length; ++i) { f(nodes[i]); }
}

function prepareArticle(a) {
	// footnotes show/hide
	selectorForEach(a, '.footnote-ref', function(h) {
		var f = h.nextSibling;
		if(!f.classList.contains('show')) { f.style.opacity = 0; }
		h.onclick = function() {
			f.style.display = 'block';
			f.classList.toggle('show');
			setTimeout(function() {
				f.style.opacity = 1 - f.style.opacity;
			}, 50);
		};
		f.addEventListener('transitionend', function() {
			if(!f.classList.contains('show')) { f.style.display = 'none'; }
		}, false);
	});
	
	// parentheses pairs hover highlight
	selectorForEach(a, '.syntax-highlight', function(h) {
		selectorForEach(h, '.lparen', function(p) {
			var n = p.dataset.parenNo;
			var q = h.querySelector('.rparen[data-paren-no="' + n + '"]');
			p.onmouseenter = q.onmouseenter = function() {
				p.classList.add('hover-highlight');
				q.classList.add('hover-highlight');
			};
			p.onmouseleave = q.onmouseleave = function() {
				p.classList.remove('hover-highlight');
				q.classList.remove('hover-highlight');
			};
		});
	});
}

prepareArticle(document);
