--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-08-03 20:55:12

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
-- TOC entry 3373 (class 1262 OID 16882)
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
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16896)
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
-- TOC entry 213 (class 1259 OID 16895)
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
-- TOC entry 216 (class 1259 OID 16902)
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
-- TOC entry 215 (class 1259 OID 16901)
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
-- TOC entry 228 (class 1259 OID 16938)
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
-- TOC entry 227 (class 1259 OID 16937)
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
-- TOC entry 226 (class 1259 OID 16932)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name_product character varying,
    price numeric,
    stock integer,
    conditon character varying,
    size character varying,
    color character varying,
    photo character varying,
    description text,
    rating integer,
    seller_id character varying,
    brand character varying,
    chategory character varying
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16931)
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
-- TOC entry 212 (class 1259 OID 16890)
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
-- TOC entry 211 (class 1259 OID 16889)
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
-- TOC entry 224 (class 1259 OID 16926)
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
-- TOC entry 223 (class 1259 OID 16925)
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
-- TOC entry 218 (class 1259 OID 16908)
-- Name: rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    produck_id integer,
    seller_id integer,
    photo character varying,
    review text,
    rating integer,
    user_id integer
);


ALTER TABLE public.rating OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16907)
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
-- TOC entry 220 (class 1259 OID 16914)
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
-- TOC entry 219 (class 1259 OID 16913)
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
-- TOC entry 210 (class 1259 OID 16884)
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
-- TOC entry 209 (class 1259 OID 16883)
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
-- TOC entry 222 (class 1259 OID 16920)
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
-- TOC entry 221 (class 1259 OID 16919)
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
-- TOC entry 3353 (class 0 OID 16896)
-- Dependencies: 214
-- Data for Name: address_costumer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address_costumer (id, recepient_name, recepient_phone, address, city, postal_code, primary_address, place_name, costumer_id) FROM stdin;
\.


--
-- TOC entry 3355 (class 0 OID 16902)
-- Dependencies: 216
-- Data for Name: bag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bag (id, seller_id, product_id, details, user_id) FROM stdin;
\.


--
-- TOC entry 3367 (class 0 OID 16938)
-- Dependencies: 228
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, seller_id, costumer_id, chat) FROM stdin;
\.


--
-- TOC entry 3365 (class 0 OID 16932)
-- Dependencies: 226
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name_product, price, stock, conditon, size, color, photo, description, rating, seller_id, brand, chategory) FROM stdin;
\.


--
-- TOC entry 3351 (class 0 OID 16890)
-- Dependencies: 212
-- Data for Name: profile_costumer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_costumer (id, full_name, picture, phone, gender, birth_date, costumer_id) FROM stdin;
\.


--
-- TOC entry 3363 (class 0 OID 16926)
-- Dependencies: 224
-- Data for Name: profile_store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_store (id, store_name, email, phone, description, photo, seller_id) FROM stdin;
\.


--
-- TOC entry 3357 (class 0 OID 16908)
-- Dependencies: 218
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rating (id, produck_id, seller_id, photo, review, rating, user_id) FROM stdin;
\.


--
-- TOC entry 3359 (class 0 OID 16914)
-- Dependencies: 220
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, status, order_number, tracking_number, quantity, total_amount, payment_method, product_id, details, seller_id, costumer_id) FROM stdin;
\.


--
-- TOC entry 3349 (class 0 OID 16884)
-- Dependencies: 210
-- Data for Name: users_costumer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_costumer (id, username, email, password) FROM stdin;
\.


--
-- TOC entry 3361 (class 0 OID 16920)
-- Dependencies: 222
-- Data for Name: users_seller; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_seller (id, username, email, password, phone, store_name) FROM stdin;
\.


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 213
-- Name: address_costumer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_costumer_id_seq', 1, false);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 215
-- Name: bag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bag_id_seq', 1, false);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 227
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chats_id_seq', 1, false);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 211
-- Name: profile_costumer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_costumer_id_seq', 1, false);


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 223
-- Name: profile_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_store_id_seq', 1, false);


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 217
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_id_seq', 1, false);


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 219
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_costumer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_costumer_id_seq', 1, false);


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_seller_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_seller_id_seq', 1, false);


-- Completed on 2022-08-03 20:55:12

--
-- PostgreSQL database dump complete
--

