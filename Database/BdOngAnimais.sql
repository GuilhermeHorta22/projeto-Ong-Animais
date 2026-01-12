--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6

-- Started on 2025-12-04 17:51:05

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
-- TOC entry 219 (class 1259 OID 17115)
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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 17116)
-- Name: adocao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adocao (
    id integer DEFAULT nextval('public.adocao_id_seq'::regclass) NOT NULL,
    id_animal integer NOT NULL,
    id_usuario integer NOT NULL,
    data_adocao date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.adocao OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17106)
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
-- TOC entry 218 (class 1259 OID 17107)
-- Name: animal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.animal (
    id integer DEFAULT nextval('public.animal_id_seq'::regclass) NOT NULL,
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
-- TOC entry 215 (class 1259 OID 17098)
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
-- TOC entry 216 (class 1259 OID 17099)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer DEFAULT nextval('public.usuario_id_seq'::regclass) NOT NULL,
    nome character varying(100) NOT NULL,
    cpf character varying(14) NOT NULL,
    telefone character varying(20) NOT NULL,
    endereco text NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(255) NOT NULL,
    tipo character varying(10) NOT NULL,
    CONSTRAINT usuario_tipo_check CHECK (((tipo)::text = ANY (ARRAY[('ADMIN'::character varying)::text, ('ADOTANTE'::character varying)::text])))
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 4865 (class 0 OID 17116)
-- Dependencies: 220
-- Data for Name: adocao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adocao (id, id_animal, id_usuario, data_adocao) FROM stdin;
\.


--
-- TOC entry 4863 (class 0 OID 17107)
-- Dependencies: 218
-- Data for Name: animal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.animal (id, nome, especie, raca, idade, porte, descricao, status, foto_url) FROM stdin;
\.


--
-- TOC entry 4861 (class 0 OID 17099)
-- Dependencies: 216
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nome, cpf, telefone, endereco, email, senha, tipo) FROM stdin;
\.


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 219
-- Name: adocao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adocao_id_seq', 1, false);


--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 217
-- Name: animal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.animal_id_seq', 1, false);


--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 1, false);


--
-- TOC entry 4714 (class 2606 OID 17122)
-- Name: adocao adocao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adocao
    ADD CONSTRAINT adocao_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 17124)
-- Name: animal animal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animal
    ADD CONSTRAINT animal_pkey PRIMARY KEY (id);


--
-- TOC entry 4706 (class 2606 OID 17128)
-- Name: usuario usuario_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cpf_key UNIQUE (cpf);


--
-- TOC entry 4708 (class 2606 OID 17130)
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- TOC entry 4710 (class 2606 OID 17126)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 17131)
-- Name: adocao adocao_id_animal_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adocao
    ADD CONSTRAINT adocao_id_animal_fkey FOREIGN KEY (id_animal) REFERENCES public.animal(id) ON DELETE CASCADE;


--
-- TOC entry 4716 (class 2606 OID 17136)
-- Name: adocao adocao_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adocao
    ADD CONSTRAINT adocao_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


-- Completed on 2025-12-04 17:51:05

--
-- PostgreSQL database dump complete
--

-- adiciona nova tabela do banco de dados
CREATE TABLE password_reset (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT false
);
