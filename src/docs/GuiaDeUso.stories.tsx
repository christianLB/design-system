import { useMDXComponents as _provideComponents } from "@mdx-js/react";
import { Meta } from '@storybook/blocks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    ol: "ol",
    li: "li",
    code: "code",
    ul: "ul",
    em: "em",
    pre: "pre"
  }, _provideComponents(), props.components);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Meta, {
      title: "Docs/Guia de uso"
    }), "\n", /*#__PURE__*/_jsx(_components.h1, {
      children: "Gu\\u00eda de uso del Design System"
    }), "\n", /*#__PURE__*/_jsx(_components.p, {
      children: "Esta gu\\u00eda resume c\\u00f3mo contribuir con nuevas historias y buenas pr\\u00e1cticas."
    }), "\n", /*#__PURE__*/_jsx(_components.h2, {
      children: "C\\u00f3mo contribuir"
    }), "\n", /*#__PURE__*/_jsxs(_components.ol, {
      children: ["\n", /*#__PURE__*/_jsxs(_components.li, {
        children: ["Agrega tu componente en ", /*#__PURE__*/_jsx(_components.code, {
          children: "src/components"
        }), " con sus pruebas."]
      }), "\n", /*#__PURE__*/_jsx(_components.li, {
        children: "Crea su historia bajo la misma carpeta."
      }), "\n", /*#__PURE__*/_jsxs(_components.li, {
        children: ["Aseg\\u00farate de exportar un ", /*#__PURE__*/_jsx(_components.code, {
          children: "meta"
        }), " con ", /*#__PURE__*/_jsx(_components.code, {
          children: "title"
        }), " y ", /*#__PURE__*/_jsx(_components.code, {
          children: "component"
        }), "."]
      }), "\n"]
    }), "\n", /*#__PURE__*/_jsx(_components.h2, {
      children: "Criterios de accesibilidad"
    }), "\n", /*#__PURE__*/_jsxs(_components.ul, {
      children: ["\n", /*#__PURE__*/_jsx(_components.li, {
        children: "Usa atributos ARIA cuando corresponda."
      }), "\n", /*#__PURE__*/_jsx(_components.li, {
        children: "Verifica la navegaci\\u00f3n por teclado."
      }), "\n", /*#__PURE__*/_jsx(_components.li, {
        children: "Asegura contraste suficiente en modo claro y oscuro."
      }), "\n"]
    }), "\n", /*#__PURE__*/_jsx(_components.h2, {
      children: "Convenciones de nomenclatura"
    }), "\n", /*#__PURE__*/_jsxs(_components.ul, {
      children: ["\n", /*#__PURE__*/_jsxs(_components.li, {
        children: ["Componentes en ", /*#__PURE__*/_jsx(_components.em, {
          children: "PascalCase"
        }), "."]
      }), "\n", /*#__PURE__*/_jsxs(_components.li, {
        children: ["Archivos de historia terminan en ", /*#__PURE__*/_jsx(_components.code, {
          children: ".stories.tsx"
        }), " o ", /*#__PURE__*/_jsx(_components.code, {
          children: ".stories.mdx"
        }), "."]
      }), "\n"]
    }), "\n", /*#__PURE__*/_jsx(_components.h2, {
      children: "Ejemplo de estructura ideal"
    }), "\n", /*#__PURE__*/_jsx(_components.pre, {
      children: /*#__PURE__*/_jsx(_components.code, {
        className: "language-tsx",
        children: "import type { Meta, StoryObj } from '@storybook/react';\nimport { Button } from './Button';\n\nconst meta: Meta<typeof Button> = {\n  title: 'Inputs/Button',\n  component: Button,\n};\nexport default meta;\n\nexport const Primary: StoryObj<typeof Button> = {\n  args: { children: 'Enviar' },\n};\n"
      })
    })]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = Object.assign({}, _provideComponents(), props.components);
  return MDXLayout ? /*#__PURE__*/_jsx(MDXLayout, {
    ...props,
    children: /*#__PURE__*/_jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
/* ========= */
export const __page = () => {
  throw new Error("Docs-only story");
};
__page.parameters = {
  docsOnly: true
};
const componentMeta = {
  title: 'Docs/Guia de uso',
  tags: ['stories-mdx'],
  includeStories: ["__page"]
};
componentMeta.parameters = componentMeta.parameters || {};
componentMeta.parameters.docs = {
  ...(componentMeta.parameters.docs || {}),
  page: MDXContent
};
export default componentMeta;
