--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-08-07 20:17:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE fashio;
--
-- TOC entry 3415 (class 1262 OID 16699)
-- Name: fashio; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE fashio WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';


ALTER DATABASE fashio OWNER TO postgres;

\connect fashio

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16700)
-- Name: address_costumer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address_costumer (
    id integer NOT NULL,
    recepient_name character varying,
    recepient_phone character varying,
    address text,
    city character varying,
    postal_code integer,
    primary_address boolean,
    place_name character varying,
    costumer_id integer
);


ALTER TABLE public.address_costumer OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16705)
-- Name: address_costumer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.address_costumer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.address_costumer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 16706)
-- Name: bag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bag (
    id integer NOT NULL,
    seller_id integer,
    product_id integer,
    details character varying,
    user_id integer
);


ALTER TABLE public.bag OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16711)
-- Name: bag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bag ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.bag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 16712)
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id integer NOT NULL,
    seller_id integer,
    costumer_id integer,
    chat character varying
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16717)
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.chats ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.chats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16718)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name_product character varying,
    price numeric,
    condition character varying,
    photo1 character varying,
    description text,
    rating integer,
    seller_id integer,
    photo2 character varying,
    photo3 character varying,
    photo4 character varying,
    photo5 character varying
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16723)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16724)
-- Name: profile_costumer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_costumer (
    id integer NOT NULL,
    full_name character varying,
    picture character varying,
    phone character varying,
    gender character varying,
    birth_date date,
    costumer_id integer NOT NULL
);


ALTER TABLE public.profile_costumer OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16729)
-- Name: profile_costumer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile_costumer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_costumer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16730)
-- Name: profile_store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_store (
    id integer NOT NULL,
    store_name character varying,
    email character varying,
    phone character varying,
    description text,
    photo character varying,
    seller_id integer
);


ALTER TABLE public.profile_store OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16735)
-- Name: profile_store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile_store ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16736)
-- Name: rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    produck_id integer,
    seller_id integer,
    photo character varying,
    review text,
    rating integer,
    costumer_id integer
);


ALTER TABLE public.rating OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16741)
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rating ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rating_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 16761)
-- Name: size; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.size (
    id integer NOT NULL,
    name character varying,
    stock integer,
    variant_id integer
);


ALTER TABLE public.size OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16760)
-- Name: size_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.size ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.size_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 16742)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    status character varying,
    order_number character varying,
    tracking_number character varying,
    quantity integer,
    total_amount numeric,
    payment_method character varying,
    product_id integer,
    details character varying,
    seller_id integer,
    costumer_id integer
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16747)
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transactions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 16748)
-- Name: users_costumer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_costumer (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users_costumer OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16753)
-- Name: users_costumer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_costumer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_costumer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 16754)
-- Name: users_seller; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_seller (
    id integer NOT NULL,
    username character varying,
    email character varying,
    password character varying,
    phone character varying,
    store_name character varying
);


ALTER TABLE public.users_seller OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16759)
-- Name: users_seller_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_seller ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_seller_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 16768)
-- Name: variant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.variant (
    id integer NOT NULL,
    color character varying,
    product_id integer
);


ALTER TABLE public.variant OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16767)
-- Name: variant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.variant ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.variant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3386 (class 0 OID 16700)
-- Dependencies: 209
-- Data for Name: address_costumer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address_costumer (id, recepient_name, recepient_phone, address, city, postal_code, primary_address, place_name, costumer_id) FROM stdin;
\.


--
-- TOC entry 3388 (class 0 OID 16706)
-- Dependencies: 211
-- Data for Name: bag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bag (id, seller_id, product_id, details, user_id) FROM stdin;
\.


--
-- TOC entry 3390 (class 0 OID 16712)
-- Dependencies: 213
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, seller_id, costumer_id, chat) FROM stdin;
6	19	1	apa tod
7	19	1	Hehe ga jadi
8	19	1	dih kintil
\.


--
-- TOC entry 3392 (class 0 OID 16718)
-- Dependencies: 215
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name_product, price, condition, photo1, description, rating, seller_id, photo2, photo3, photo4, photo5) FROM stdin;
3	Siza	\N	new	\N	\N	\N	2	\N	\N	\N	\N
5	Baju	\N	new	\N	\N	\N	19	\N	\N	\N	\N
8	Celana	\N	new	1659794972576.jpeg	\N	\N	19	1659794972585.jpeg	1659794972586.jpeg	\N	\N
9	Jaket	\N	new	1659843801181.jpeg	asulo	\N	19	1659843801200.jpeg	1659843801201.jpeg	\N	\N
\.


--
-- TOC entry 3394 (class 0 OID 16724)
-- Dependencies: 217
-- Data for Name: profile_costumer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_costumer (id, full_name, picture, phone, gender, birth_date, costumer_id) FROM stdin;
1	pamela	\N	08349234223	laki	2001-08-27	1
\.


--
-- TOC entry 3396 (class 0 OID 16730)
-- Dependencies: 219
-- Data for Name: profile_store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_store (id, store_name, email, phone, description, photo, seller_id) FROM stdin;
2	zahira	test@mail.com	0989770	fadsfadsgadsgasdfrdasgdsfg	1659790533618.jpeg	19
\.


--
-- TOC entry 3398 (class 0 OID 16736)
-- Dependencies: 221
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rating (id, produck_id, seller_id, photo, review, rating, costumer_id) FROM stdin;
\.


--
-- TOC entry 3407 (class 0 OID 16761)
-- Dependencies: 230
-- Data for Name: size; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.size (id, name, stock, variant_id) FROM stdin;
1	L	4	3
3	L	6	5
5	L	2	8
17	L	100	\N
18	L	2	16
19	L	5	17
\.


--
-- TOC entry 3400 (class 0 OID 16742)
-- Dependencies: 223
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, status, order_number, tracking_number, quantity, total_amount, payment_method, product_id, details, seller_id, costumer_id) FROM stdin;
\.


--
-- TOC entry 3402 (class 0 OID 16748)
-- Dependencies: 225
-- Data for Name: users_costumer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_costumer (id, username, email, password) FROM stdin;
1	apabisa	apabila@mail.com	sadboy
\.


--
-- TOC entry 3404 (class 0 OID 16754)
-- Dependencies: 227
-- Data for Name: users_seller; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_seller (id, username, email, password, phone, store_name) FROM stdin;
2	test	test	test		
19	bapamu	test@mail.com	$2b$10$XN3ZDTArf44hVSTdwEX7DO3GMLUndnKk/oVs2ala0Va6p1ezUoLPO	0989770	miraza
\.


--
-- TOC entry 3409 (class 0 OID 16768)
-- Dependencies: 232
-- Data for Name: variant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variant (id, color, product_id) FROM stdin;
3	red	3
5	red	5
8	red	8
16	army	9
17	blue	9
\.


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 210
-- Name: address_costumer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_costumer_id_seq', 1, false);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 212
-- Name: bag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bag_id_seq', 1, false);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 214
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chats_id_seq', 8, true);


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 216
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 9, true);


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 218
-- Name: profile_costumer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_costumer_id_seq', 1, true);


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 220
-- Name: profile_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_store_id_seq', 2, true);


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 222
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_id_seq', 1, false);


--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 229
-- Name: size_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.size_id_seq', 19, true);


--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 224
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 226
-- Name: users_costumer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_costumer_id_seq', 1, true);


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 228
-- Name: users_seller_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_seller_id_seq', 19, true);


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 231
-- Name: variant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.variant_id_seq', 17, true);


--
-- TOC entry 3220 (class 2606 OID 16778)
-- Name: products products_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_id PRIMARY KEY (id);


--
-- TOC entry 3222 (class 2606 OID 16776)
-- Name: users_costumer users_costumer_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_costumer
    ADD CONSTRAINT users_costumer_id PRIMARY KEY (id);


--
-- TOC entry 3224 (class 2606 OID 16942)
-- Name: users_costumer users_costumer_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_costumer
    ADD CONSTRAINT users_costumer_unique UNIQUE (username, email, password);


--
-- TOC entry 3226 (class 2606 OID 16774)
-- Name: users_seller users_seller_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_seller
    ADD CONSTRAINT users_seller_id PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 16944)
-- Name: users_seller users_seller_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_seller
    ADD CONSTRAINT users_seller_unique UNIQUE (username, email, password, phone, store_name);


--
-- TOC entry 3230 (class 2606 OID 16930)
-- Name: variant variant_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variant
    ADD CONSTRAINT variant_id PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 16849)
-- Name: address_costumer address_costumer_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address_costumer
    ADD CONSTRAINT address_costumer_fk FOREIGN KEY (costumer_id) REFERENCES public.users_costumer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3232 (class 2606 OID 16854)
-- Name: bag bag_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bag
    ADD CONSTRAINT bag_fk FOREIGN KEY (user_id) REFERENCES public.users_costumer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3233 (class 2606 OID 16859)
-- Name: bag bag_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bag
    ADD CONSTRAINT bag_fk_1 FOREIGN KEY (seller_id) REFERENCES public.users_seller(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3234 (class 2606 OID 16864)
-- Name: bag bag_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bag
    ADD CONSTRAINT bag_fk_2 FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3235 (class 2606 OID 16869)
-- Name: chats chats_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_fk FOREIGN KEY (costumer_id) REFERENCES public.users_costumer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3236 (class 2606 OID 16874)
-- Name: chats chats_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_fk_1 FOREIGN KEY (seller_id) REFERENCES public.users_seller(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3237 (class 2606 OID 16879)
-- Name: profile_costumer profile_costumer_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_costumer
    ADD CONSTRAINT profile_costumer_fk FOREIGN KEY (costumer_id) REFERENCES public.users_costumer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3238 (class 2606 OID 16884)
-- Name: profile_store profile_store_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_store
    ADD CONSTRAINT profile_store_fk FOREIGN KEY (seller_id) REFERENCES public.users_seller(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3239 (class 2606 OID 16834)
-- Name: rating rating_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_fk FOREIGN KEY (seller_id) REFERENCES public.users_seller(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3240 (class 2606 OID 16839)
-- Name: rating rating_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_fk_1 FOREIGN KEY (costumer_id) REFERENCES public.users_costumer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3241 (class 2606 OID 16844)
-- Name: rating rating_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_fk_2 FOREIGN KEY (produck_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3245 (class 2606 OID 16931)
-- Name: size size_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.size
    ADD CONSTRAINT size_fk FOREIGN KEY (variant_id) REFERENCES public.variant(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3242 (class 2606 OID 16904)
-- Name: transactions transactions_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_fk FOREIGN KEY (costumer_id) REFERENCES public.users_costumer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3243 (class 2606 OID 16909)
-- Name: transactions transactions_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_fk_1 FOREIGN KEY (seller_id) REFERENCES public.users_seller(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3244 (class 2606 OID 16914)
-- Name: transactions transactions_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_fk_2 FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3246 (class 2606 OID 16936)
-- Name: variant variant_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variant
    ADD CONSTRAINT variant_fk FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-08-07 20:17:34

--
-- PostgreSQL database dump complete
--

