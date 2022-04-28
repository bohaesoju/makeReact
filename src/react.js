export function createElement(tagName, props, ...children) {
  return { tagName, props, children: children.flat() }
}

export function renderRealDOM(virtualDOM){
  // virtualDom Node 는 tag 일수도, text 일수도 있다.
  if(typeof virtualDOM === 'string'){
    return document.createTextNode(virtualDOM)
  }

  // tag 에 대한 엘리먼트를 만든다
  const $Element = document.createElement(virtualDOM.tagName);

  virtualDOM.children
    // virtualDom 의 children 을 순회하며 DOM 으로 변환한다.
    // 객체를 element 로 변경 하고 구조가 동일하기에 재귀 패턴 으로 renderRealDOM을 인자로 넣어준다.
    .map(renderRealDOM)
    // $Element 에 변환된 Children Dom 을 추가한다.
    .forEach(node => $Element.appendChild(node));
  return $Element;
}

export function diffingUpdate (parent, newNode, oldNode, parentIndex = 0) {
  // oldNode의 내용과 newNode의 내용이 다르다면, oldNode의 내용을 newNode의 내용으로 교체한다.
	// updateElement 는 재귀로 호출된다. object 가 아닌 문자열로 넘어올때 문자열을 교체해준다
  if (typeof newNode === "string" && typeof oldNode === "string") {
    // 해당 문자열이 동일하다면, replace 해줄 이유가 없다.
    if (newNode === oldNode) return;
    // replaceChild 는 newChild, oldChild 를 인자로 받는다.
    return parent.replaceChild(
      renderRealDOM(newNode),
      parent.childNodes[parentIndex]
    )
  }

  // newNode와 oldNode의 모든 자식 태그를 순회하며 updateElement 를 반복해준다.
  for (const [index] of newNode.children.entries()) {
    updateElement(
      parent.childNodes[parentIndex],
      newNode.children[index],
      oldNode.children[index],
      index
    )
  }
}

// export function updateElement (parent, nextNode, previousNode) {
//   return parent.replaceChild(
//     renderRealDOM(nextNode),
//     parent.childNodes[0]
//   )
// }
