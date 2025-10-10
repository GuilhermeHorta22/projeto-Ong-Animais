--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-10-10 19:21:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 25295)
-- Name: adocao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adocao (
    id integer NOT NULL,
    id_animal integer NOT NULL,
    id_usuario integer NOT NULL,
    data_adocao date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.adocao OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25294)
-- Name: adocao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adocao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.adocao_id_seq OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 221
-- Name: adocao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adocao_id_seq OWNED BY public.adocao.id;


--
-- TOC entry 220 (class 1259 OID 25284)
-- Name: animal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.animal (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    especie character varying(50) NOT NULL,
    raca character varying(50) NOT NULL,
    idade integer NOT NULL,
    porte character varying(20) NOT NULL,
    descricao text NOT NULL,
    status character varying(20) DEFAULT 'Disponível'::character varying NOT NULL,
    foto_url text,
    CONSTRAINT animal_status_check CHECK (((status)::text = ANY (ARRAY[('Disponível'::character varying)::text, ('Indisponível'::character varying)::text, ('Adotado'::character varying)::text])))
);


ALTER TABLE public.animal OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25283)
-- Name: animal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.animal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.animal_id_seq OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 219
-- Name: animal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.animal_id_seq OWNED BY public.animal.id;


--
-- TOC entry 218 (class 1259 OID 25270)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    cpf character varying(14) NOT NULL,
    telefone character varying(20) NOT NULL,
    endereco text NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(255) NOT NULL,
    tipo character varying(10) NOT NULL,
    CONSTRAINT usuario_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['ADMIN'::character varying, 'ADOTANTE'::character varying])::text[])))
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25269)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 4755 (class 2604 OID 25298)
-- Name: adocao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adocao ALTER COLUMN id SET DEFAULT nextval('public.adocao_id_seq'::regclass);


--
-- TOC entry 4753 (class 2604 OID 25287)
-- Name: animal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animal ALTER COLUMN id SET DEFAULT nextval('public.animal_id_seq'::regclass);


--
-- TOC entry 4752 (class 2604 OID 25273)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 4921 (class 0 OID 25295)
-- Dependencies: 222
-- Data for Name: adocao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adocao (id, id_animal, id_usuario, data_adocao) FROM stdin;
\.


--
-- TOC entry 4919 (class 0 OID 25284)
-- Dependencies: 220
-- Data for Name: animal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.animal (id, nome, especie, raca, idade, porte, descricao, status, foto_url) FROM stdin;
1	Aladim	Cachorro	podle	10	Pequeno	Carinhoso e amigavel	Disponível	\N
\.


--
-- TOC entry 4917 (class 0 OID 25270)
-- Dependencies: 218
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nome, cpf, telefone, endereco, email, senha, tipo) FROM stdin;
1	Joao horta	206.543.010-93	18997815555	Itaicy de castro, 36	jvhorta14@gmail.com	$2b$10$rwxUI/wYn5YTGCPt9yvxdeUkl6UkKT.fPRFW9gI.DK1qG1/hBNekO	ADOTANTE
3	Guilherme horta	35733261889	18996597119	Itaicy de castro, 36	ghorta800@gmail.com	$2b$10$1anadu67R/wELoaOygvJNuSoKO3nANxrgS8t/KLOLbbWsatRG96ae	ADMIN
4	caio emerick	52590876823	187777777	rua das rosas, nº40	caioemerick@gmail.com	$2b$10$QhCR4n.orfZz8lgQnSR2jeZiTnXSqP60okC6yOneYZ3XG2iDgs4q6	ADOTANTE
5	Joao Claudio	06987715831	18997788472	rua nelo liberati	joaoclaudio@gmail.com	$2b$10$wWy5.cels8QdFm49PFouvO9EgVChr6n/kb94jwtljYX78elgqw.Ki	ADOTANTE
6	Guilherme Horta	823.940.220-86	(18)99995151	Itaicy de castro, Nº100	ghorta@gmail.com	$2b$10$lG6362WNRi8Mnx9hFo.dquftacnQsY.o6j3pNSQh814FdVrhMqTdq	ADMIN
\.


--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 221
-- Name: adocao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adocao_id_seq', 1, false);


--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 219
-- Name: animal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.animal_id_seq', 3, true);


--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 6, true);


--
-- TOC entry 4768 (class 2606 OID 25301)
-- Name: adocao adocao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adocao
    ADD CONSTRAINT adocao_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 25293)
-- Name: animal animal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animal
    ADD CONSTRAINT animal_pkey PRIMARY KEY (id);


--
-- TOC entry 4760 (class 2606 OID 25280)
-- Name: usuario usuario_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cpf_key UNIQUE (cpf);


--
-- TOC entry 4762 (class 2606 OID 25282)
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- TOC entry 4764 (class 2606 OID 25278)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 4769 (class 2606 OID 25302)
-- Name: adocao adocao_id_animal_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adocao
    ADD CONSTRAINT adocao_id_animal_fkey FOREIGN KEY (id_animal) REFERENCES public.animal(id) ON DELETE CASCADE;


--
-- TOC entry 4770 (class 2606 OID 25307)
-- Name: adocao adocao_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adocao
    ADD CONSTRAINT adocao_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


-- Completed on 2025-10-10 19:21:27

--
-- PostgreSQL database dump complete
--

