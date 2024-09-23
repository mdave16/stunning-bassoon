
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.31.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/reading-ease-scorer.svelte generated by Svelte v3.31.0 */

    const { console: console_1 } = globals;
    const file = "src/reading-ease-scorer.svelte";

    function create_fragment(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let t4;
    	let t5_value = ariReadingEase(inputText) + "";
    	let t5;
    	let t6;
    	let p2;
    	let t7;
    	let t8_value = colemanLiauReadingEase(inputText) + "";
    	let t8;
    	let t9;
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Text Analysis";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Reading Ease from 0 (hard) to 100 (easy)";
    			t3 = space();
    			p1 = element("p");
    			t4 = text("Automated Readability Index Reading Ease: ");
    			t5 = text(t5_value);
    			t6 = space();
    			p2 = element("p");
    			t7 = text("Coleman-Liau Index Reading Ease: ");
    			t8 = text(t8_value);
    			t9 = space();
    			textarea = element("textarea");
    			attr_dev(h1, "class", "svelte-6u4otw");
    			add_location(h1, file, 74, 1, 2291);
    			attr_dev(p0, "class", "svelte-6u4otw");
    			add_location(p0, file, 75, 1, 2315);
    			attr_dev(p1, "class", "svelte-6u4otw");
    			add_location(p1, file, 76, 1, 2364);
    			attr_dev(p2, "class", "svelte-6u4otw");
    			add_location(p2, file, 77, 1, 2442);
    			attr_dev(textarea, "placeholder", "Text");
    			attr_dev(textarea, "class", "svelte-6u4otw");
    			add_location(textarea, file, 82, 1, 2722);
    			attr_dev(div, "class", "grid svelte-6u4otw");
    			add_location(div, file, 73, 0, 2271);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p0);
    			append_dev(div, t3);
    			append_dev(div, p1);
    			append_dev(p1, t4);
    			append_dev(p1, t5);
    			append_dev(div, t6);
    			append_dev(div, p2);
    			append_dev(p2, t7);
    			append_dev(p2, t8);
    			append_dev(div, t9);
    			append_dev(div, textarea);
    			set_input_value(textarea, inputText);

    			if (!mounted) {
    				dispose = listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[0]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*inputText*/ 0 && t5_value !== (t5_value = ariReadingEase(inputText) + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*inputText*/ 0 && t8_value !== (t8_value = colemanLiauReadingEase(inputText) + "")) set_data_dev(t8, t8_value);

    			if (dirty & /*inputText*/ 0) {
    				set_input_value(textarea, inputText);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    let inputText = "";

    const gradeToReadingEase = grade => {
    	console.log(grade, 100 - (grade - 1) / 19 * 100);
    	return Math.min(100, Math.max(0, 100 - (grade - 1) / 19 * 100));
    };

    const roundToNdp = (num, dp) => {
    	const factor = Math.pow(10, dp);
    	return Math.round((num + Number.EPSILON) * factor) / factor;
    };

    const words2 = text => {
    	// const words = text.match(/\S+/g)?.length || 0;
    	return text.split(" ").length;
    };

    const sentences2 = text => {
    	var _a;

    	return ((_a = text.replace("...", ".").replace("..", ".").match(/\S.*?\."?(?=\s|$)/g)) === null || _a === void 0
    	? void 0
    	: _a.length) || 0;
    };

    const characters2 = text => {
    	// 		const allChars = text.match(/[a-zA-Z0-9]/g) || []
    	// const uniqueChars = new Set(allChars);
    	// const characters = allChars.length || 0;
    	return text.length;
    };

    const ariReadingEase = text => {
    	const words = words2(text);
    	const characters = characters2(text);
    	const sentences = sentences2(text);
    	const ari = 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
    	const readingEaseBounded = gradeToReadingEase(ari);
    	return roundToNdp(readingEaseBounded, 2);
    };

    function colemanLiauReadingEase(text) {
    	const words = words2(text);
    	const characters = characters2(text);
    	const sentences = sentences2(text);
    	const averageLettersPer100Words = characters / words * 100;
    	const averageNumberOfSetencesPer100Words = sentences / words * 100;
    	const colemanLiau = 0.0588 * averageLettersPer100Words - 0.296 * averageNumberOfSetencesPer100Words - 15.8;
    	console.log("L", averageLettersPer100Words, "S", averageNumberOfSetencesPer100Words, "CLI", colemanLiau);
    	console.log("CLI", colemanLiau);
    	const readingEaseBounded = gradeToReadingEase(colemanLiau);
    	return roundToNdp(readingEaseBounded, 2);
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Reading_ease_scorer", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Reading_ease_scorer> was created with unknown prop '${key}'`);
    	});

    	function textarea_input_handler() {
    		inputText = this.value;
    	}

    	$$self.$capture_state = () => ({
    		inputText,
    		gradeToReadingEase,
    		roundToNdp,
    		words2,
    		sentences2,
    		characters2,
    		ariReadingEase,
    		colemanLiauReadingEase
    	});

    	return [textarea_input_handler];
    }

    class Reading_ease_scorer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Reading_ease_scorer",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new Reading_ease_scorer({
        target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
