const regex = /if\(!\$self\.componentProps\?\.authorset\?\.includes\(curentUserId\)\) \{([^}]*)\}/;

const uiToTemplate = (type) => {
  switch (type) {
    case 'opacityNull':
      return `$self.setComponentProps({style:{opacity:0}})`;
    case 'hidden':
      return `$self.visible = false`;
    case 'disabled':
      return `$self['x-pattern'] = 'disabled'`;
    case 'readOnly':
      return `$self['x-pattern'] = 'readOnly'`;
    default:
      return `$self.visible = false`;
  }
};

export const comAuthorTemplate = (node) => {
  const oldScript = node?.props?.['x-reactions']?.['fulfill']?.run;
  if (oldScript.includes('if(!$self.componentProps?.authorset?.includes(curentUserId))')) {
    let str = oldScript;
    if (oldScript.includes('$self.setComponentProps({style:{opacity:0}})')) {
      str = oldScript.replace('$self.setComponentProps({style:{opacity:0}})', '');
    }
    return str.replace(regex, `if(!$self.componentProps?.authorset?.includes(curentUserId)) { ${uiToTemplate(node?.props['x-component-props']?.notauthor)} }`);
  } else {
    return `${oldScript}
$effect(()=>{
    const curentUserId = JSON.parse(localStorage.getItem('manana-care_userInfo') || '{}')?.userId;
    if(!$self.componentProps?.authorset?.includes(curentUserId)) {
      $self.visible = false;
    }
},[])`;
  }
};