PGDMP  	    +                |            bd_vehiculosTalentoTech    16.4    16.4 %    9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            <           1262    16558    bd_vehiculosTalentoTech    DATABASE     �   CREATE DATABASE "bd_vehiculosTalentoTech" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
 )   DROP DATABASE "bd_vehiculosTalentoTech";
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            =           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    16794 
   alquileres    TABLE     �   CREATE TABLE public.alquileres (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    vehiculo_id integer NOT NULL,
    vendedor_id integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL
);
    DROP TABLE public.alquileres;
       public         heap    postgres    false    4            �            1259    16793    alquileres_id_seq    SEQUENCE     �   CREATE SEQUENCE public.alquileres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.alquileres_id_seq;
       public          postgres    false    223    4            >           0    0    alquileres_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.alquileres_id_seq OWNED BY public.alquileres.id;
          public          postgres    false    222            �            1259    16836    clientes    TABLE       CREATE TABLE public.clientes (
    id bigint NOT NULL,
    nombre_cliente text NOT NULL,
    correo_cliente text NOT NULL,
    telefono_cliente text NOT NULL,
    direccion_cliente text NOT NULL,
    ciudad_cliente text NOT NULL,
    contrasena text NOT NULL
);
    DROP TABLE public.clientes;
       public         heap    postgres    false    4            �            1259    16835    clientes_id_seq    SEQUENCE     �   ALTER TABLE public.clientes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.clientes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    225            �            1259    16568 "   nuevo_usuario_id_nuevo_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.nuevo_usuario_id_nuevo_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.nuevo_usuario_id_nuevo_usuario_seq;
       public          postgres    false    4            �            1259    16785    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    empleado_id text NOT NULL,
    contrasena text NOT NULL,
    correo text NOT NULL,
    rol text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16784    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    4    221            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    220            �            1259    16721 	   vehiculos    TABLE     �   CREATE TABLE public.vehiculos (
    id integer NOT NULL,
    marca text NOT NULL,
    modelo text NOT NULL,
    anio integer NOT NULL,
    color text,
    tipo_motor text,
    precio_alquiler_diario numeric NOT NULL
);
    DROP TABLE public.vehiculos;
       public         heap    postgres    false    4            �            1259    16720    vehiculos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vehiculos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.vehiculos_id_seq;
       public          postgres    false    219    4            @           0    0    vehiculos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.vehiculos_id_seq OWNED BY public.vehiculos.id;
          public          postgres    false    218            �           2604    16797    alquileres id    DEFAULT     n   ALTER TABLE ONLY public.alquileres ALTER COLUMN id SET DEFAULT nextval('public.alquileres_id_seq'::regclass);
 <   ALTER TABLE public.alquileres ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    16788    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    16724    vehiculos id    DEFAULT     l   ALTER TABLE ONLY public.vehiculos ALTER COLUMN id SET DEFAULT nextval('public.vehiculos_id_seq'::regclass);
 ;   ALTER TABLE public.vehiculos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            4          0    16794 
   alquileres 
   TABLE DATA           g   COPY public.alquileres (id, usuario_id, vehiculo_id, vendedor_id, fecha_inicio, fecha_fin) FROM stdin;
    public          postgres    false    223   y)       6          0    16836    clientes 
   TABLE DATA           �   COPY public.clientes (id, nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena) FROM stdin;
    public          postgres    false    225   n*       2          0    16785    users 
   TABLE DATA           I   COPY public.users (id, empleado_id, contrasena, correo, rol) FROM stdin;
    public          postgres    false    221   h-       0          0    16721 	   vehiculos 
   TABLE DATA           g   COPY public.vehiculos (id, marca, modelo, anio, color, tipo_motor, precio_alquiler_diario) FROM stdin;
    public          postgres    false    219   s.       A           0    0    alquileres_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.alquileres_id_seq', 44, true);
          public          postgres    false    222            B           0    0    clientes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.clientes_id_seq', 29, true);
          public          postgres    false    224            C           0    0 "   nuevo_usuario_id_nuevo_usuario_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.nuevo_usuario_id_nuevo_usuario_seq', 1, false);
          public          postgres    false    217            D           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 10, true);
          public          postgres    false    220            E           0    0    vehiculos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.vehiculos_id_seq', 27, true);
          public          postgres    false    218            �           2606    16799    alquileres alquileres_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.alquileres
    ADD CONSTRAINT alquileres_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.alquileres DROP CONSTRAINT alquileres_pkey;
       public            postgres    false    223            �           2606    16842    clientes clientes_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_pkey;
       public            postgres    false    225            �           2606    16792    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    221            �           2606    16728    vehiculos vehiculos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.vehiculos DROP CONSTRAINT vehiculos_pkey;
       public            postgres    false    219            �           2606    16843 %   alquileres alquileres_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.alquileres
    ADD CONSTRAINT alquileres_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.clientes(id);
 O   ALTER TABLE ONLY public.alquileres DROP CONSTRAINT alquileres_usuario_id_fkey;
       public          postgres    false    225    4763    223            �           2606    16805 &   alquileres alquileres_vehiculo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.alquileres
    ADD CONSTRAINT alquileres_vehiculo_id_fkey FOREIGN KEY (vehiculo_id) REFERENCES public.vehiculos(id);
 P   ALTER TABLE ONLY public.alquileres DROP CONSTRAINT alquileres_vehiculo_id_fkey;
       public          postgres    false    223    4757    219            �           2606    16810 &   alquileres alquileres_vendedor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.alquileres
    ADD CONSTRAINT alquileres_vendedor_id_fkey FOREIGN KEY (vendedor_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.alquileres DROP CONSTRAINT alquileres_vendedor_id_fkey;
       public          postgres    false    223    4759    221            4   �   x�mRQ�� ���	�0�.���XB�:Ҟ�+�q�.����~5�ޠ*�"�
5Ih9B:�.�"�j�Ie�k�$Q�Ey@�$�8�.�D�o����-��pR�&�|��egC�LI7,[{n�3{hﰫ7++)+�j�)3\w�8�ˑF:a�Z�/���-k�%[�S�nWq%/�G햵͒M�<j���G�%�G����J�����ypS������GWx$[�`��7��|f){�      6   �  x���Mn�0���)�O#��(K�8il��� N[�f*3�4(ɉs�,�Ȣ�t�e;?��(��9B��͛7�3��Ul�h��]ͱ�p��\�$R�㬟Jr����gl�Xxwڨ�7�^��&2��������Y�&d`�]9�UE�BTwǽ$=�Q�1��|��廰�J2nt�&���ɪb��J,5V{�4@Ke����c��4%ch<���}����| ���h�F�yU{e0�]vJ32u7�.���}�܍��C����q�OT��׵cI��a�0W��ќL��Q�}�/<��+���NȤ����k`2��R;�Yͽ{���hs���e�2F"���b[�Q����ciܹ�_�<�\�s����y0���\W{�-�`Ϝ�je����eY�����	�Ԁe��`�O<Gu�a.z�<S�{@���mqۄ��m4����H�X���s!7,9`2��>�[X���H(��5�ib�ۣ�и s�X]%�d��)��/�ȝ��q�樛��\�k�.T��+�V"�x/��~L��1����3�(.�7m��C7Ә��y����k��t���h�~�W[��4#*E}[+�E�6�!����ʐ��{g�:e�J	�#s�>/��u߸�O��-�x��*^��z�L��������[�����b-�����ckkb�U�ir����;GDO�i���p�b���y%ۄ��9��Z�i�z}����_&�~�(� U���      2   �   x�u�MO�0D��c���q�$W.��W��D����I@
)�g=��xE�K�ϔ���-r��W|�_�gmR�>��5�O�!��
�j��	k_�R�&D<B:�V�f���I!YtIԆ|����(�瑥;H�-ö�����s��j�̂.�:��;�q�z�f;��2�N�A��DD;�k4_���l%��3�͔�9�g��2J�po��]��СG|��O�t˗�x�J�o���[      0   �  x�e�]��0���S�mc�籰�>�����x���]���z�^����i�"��a��	��� ;�9+f�K�ឝ��=��.�g�=�X�(����h��Bx�Ü�p	u>�����I	H�u�)l�s�_���*��J��+hKl,-���V�G��F]C��&��:x2�����Pr�ؒ�
eɈ=h��%���=:h;B�\R��8�	0*G�}���� X#;I&�`=,�4\�T��\��p,�S�R�\��ݏN�	 �i��7��4�s`�J�7*%��,�#X'���,�"iZ��%Ӛj!Vg>Z�;���Qڨ�\��d� �ح��+B"�&hI�͟:��*8Ǟ��mY쌦'*r�t�8��]~w��pX\�Vr���Q�Dp��&+G�e���T���74[%�-��;��^q�/�g��o�ڍ�gG��y6�7���O�Q/L���0UUh�(��Yi@���-C�5}����u�����d2��'�     