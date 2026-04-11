import Link from "next/link";
import { buttonVariants } from "./ui/button";
import * as Form from "@radix-ui/react-form";


const SubscriptionForm = () => {
    return (
        <div className="w-full min-h-[70vh] bg-[url('/IMG_7502.JPG')] bg-cover bg-center flex items-center justify-center py-20">

        <div className="w-full max-w-xl bg-primary/70 backdrop-blur-sm p-8 rounded-lg shadow-lg">        <Form.Root >

            <h2 className="text-2xl text-center mb-6 font-semibold text-secondary">
                ¡Tenemos un regalo espeacial para ti!
            </h2>

            {/* EMAIL */}
            <Form.Field className="mb-4" name="email">
                <Form.Label className="block mb-1 text-secondary">Correo electrónico *</Form.Label>
                <Form.Control asChild>
                    <input
                        className="w-full p-3 rounded-md bg-white/80 text-primary"
                        type="email"
                        placeholder="tu@email.com"
                        required
                    />
                </Form.Control>
            </Form.Field>

            {/* NOMBRE Y APELLIDO */}
            <div className="grid grid-cols-2 gap-4 text-secondary">

                <Form.Field name="nombre">
                    <Form.Label className="block mb-1">Nombre</Form.Label>
                    <Form.Control asChild>
                        <input
                            className="w-full p-3 rounded-md bg-white/80 text-primary"
                            placeholder="Tu nombre"
                        />
                    </Form.Control>
                </Form.Field>

                <Form.Field name="apellido">
                    <Form.Label className="block mb-1">Apellido</Form.Label>
                    <Form.Control asChild>
                        <input
                            className="w-full p-3 rounded-md bg-white/80 text-primary"
                            placeholder="Tu apellido"
                        />
                    </Form.Control>
                </Form.Field>

            </div>

            {/* CUMPLEAÑOS */}
            <div className="mt-4 text-secondary">

                <p className="mb-2">Tu cumpleaños (Día / Mes)</p>

                <div className="grid grid-cols-3 gap-2 items-center">

                    <Form.Field name="dia">
                        <Form.Control asChild>
                            <input
                                className="w-full p-3 rounded-md bg-white/80 text-center text-primary"
                                placeholder="DD"
                            />
                        </Form.Control>
                    </Form.Field>

                    <span className="text-center">/</span>

                    <Form.Field name="mes">
                        <Form.Control asChild>
                            <input
                                className="w-full p-3 rounded-md bg-white/80 text-center text-primary"
                                placeholder="MM"
                            />
                        </Form.Control>
                    </Form.Field>

                </div>

            </div>

            {/* BOTON */}
            <Form.Submit asChild>
                <button className="w-full mt-6 py-4 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800 transition">
                    SUSCRIBIRME
                </button>
            </Form.Submit>

        </Form.Root>
    </div>
    </div>
    )
}

export default SubscriptionForm