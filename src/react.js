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

export function updateElement (parent, newNode, oldNode, index = 0) {
  if (!newNode && oldNode) {
    return parent.removeChild(parent.childNodes[index]);
  }

  if (newNode && !oldNode) {
    return parent.appendChild(renderRealDOM(newNode));
  }

  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode === oldNode) return;
    return parent.replaceChild(
      renderRealDOM(newNode),
      parent.childNodes[index]
    )
  }

  if (newNode.type !== oldNode.type) {
    return parent.replaceChild(
      renderRealDOM(newNode),
      parent.childNodes[index]
    )
  }

  updateAttributes(
    parent.childNodes[index],
    newNode.props || {},
    oldNode.props || {}
  );

  const maxLength = Math.max(
    newNode.children.length,
    oldNode.children.length,
  );
  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i
    )
  }
}

function updateAttributes(target, newProps, oldProps) {
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    target.setAttribute(attr, value);
  }

  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    target.removeAttribute(attr)
  }
}