import { OrderTable } from "@/components/organisms/OrderTable";


const orders = [
	{
		id: "6af79562-ec81-4455-b786-66452588996c",
		created_at: "2024-12-27T09:00:04.037471+00:00",
		clerk_id: {
			id: "6a780c34-5e4c-4230-949c-b1c9515de991",
			tlp: 85171612738,
			name: "Vindiar Johan Diputra",
			email: "vindiari5c@gmail.com",
			address: "Gg Adam 1234",
			clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			imageUrl:
				"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycE5uVXJqTzlhV1pnTDFYaEhRS29wQ056eFYifQ",
			created_at: "2024-12-13T09:53:04.240615+00:00",
			postal_code: 16451,
		},
		gross_amount: 2399792,
		payment_type: "bank_transfer",
		bank: "bca",
		item: [
			{
				id: "9c909d4a-dbba-41ba-aa2b-9066ae6f19f8",
				created_at: "2024-12-27T08:56:02.795648+00:00",
				label: "GENTLEMAN GIVENCHY EAU DE PARFUM",
				description:
					"Gentleman Givenchy Eau de Parfum, a new intensity for men who dance to their own beat. An elegant woody-floral Oriental reminiscent of nightfall, composed with an explosive signature. A floral played out in masculine notes.\n\nFragrance Family: Woody Floral Oriental",
				price: 1142776,
				isFeatured: true,
				isNew: false,
				onSale: false,
				quantity: 1,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731501387/cfob0ntlzwiltb8zebvr.webp",
				productId: "bd0bb54e-7eac-4f4b-9681-cf04ab6e36cc",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
			{
				id: "87dfaef1-2737-4519-b8f3-0f59229e7c30",
				created_at: "2024-12-27T08:59:18.692557+00:00",
				label: "Touchscreen Winter Gloves",
				description:
					"Stay warm and connected with these stylish touchscreen winter gloves. Made from high-quality, soft material, these gloves are designed to keep your hands cozy while allowing you to use your devices seamlessly. The fingertips feature sensitive touchscreen-compatible fabric, enabling precise control without removing your gloves. The non-slip grip on the palms enhances control, making these gloves perfect for outdoor activities like running, cycling, or driving in cold weather. Ideal for both men and women, these gloves combine functionality with style.",
				price: 314254,
				isFeatured: true,
				isNew: true,
				onSale: false,
				quantity: 4,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731502927/cszj3ysji7inoi3zwj7i.jpg",
				productId: "9f5ec5cc-1d7b-45d5-97d1-803632dbb5a8",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
		],
	},
	{
		id: "8a5f4896-60b5-4766-8aad-92843128c0ce",
		created_at: "2024-12-27T09:05:22.094714+00:00",
		clerk_id: {
			id: "6a780c34-5e4c-4230-949c-b1c9515de991",
			tlp: 85171612738,
			name: "Vindiar Johan Diputra",
			email: "vindiari5c@gmail.com",
			address: "Gg Adam 1234",
			clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			imageUrl:
				"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycE5uVXJqTzlhV1pnTDFYaEhRS29wQ056eFYifQ",
			created_at: "2024-12-13T09:53:04.240615+00:00",
			postal_code: 16451,
		},
		gross_amount: 5103000,
		payment_type: "bank_transfer",
		bank: "bca",
		item: [
			{
				id: "1af4c1e6-a4d6-4a64-88b1-6c79b2b2c284",
				created_at: "2024-12-27T09:03:33.052978+00:00",
				label: "Furry Monster Keychain Doll",
				description:
					"Add a touch of whimsy to your day with this adorable furry monster keychain doll. Dressed in a soft, fluffy costume with cute bunny ears and a mischievous expression, this keychain is perfect for fans of quirky collectibles. Its compact size makes it ideal for hanging on your bag, keys, or even as a unique desk companion. Made with high-quality materials, this keychain doll is both durable and eye-catching—a fun accessory for anyone who loves playful designs.",
				price: 729000,
				isFeatured: true,
				isNew: false,
				onSale: true,
				quantity: 7,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731503440/z221phluqqvhcjnvdesm.webp",
				productId: "9244dbed-a488-4795-8b9d-db98ea990b91",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
		],
	},
	{
		id: "5299fb79-b559-4c41-aa86-c2a04850b2fb",
		created_at: "2024-12-27T09:05:22.38127+00:00",
		clerk_id: {
			id: "6a780c34-5e4c-4230-949c-b1c9515de991",
			tlp: 85171612738,
			name: "Vindiar Johan Diputra",
			email: "vindiari5c@gmail.com",
			address: "Gg Adam 1234",
			clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			imageUrl:
				"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycE5uVXJqTzlhV1pnTDFYaEhRS29wQ056eFYifQ",
			created_at: "2024-12-13T09:53:04.240615+00:00",
			postal_code: 16451,
		},
		gross_amount: 5103000,
		payment_type: "bank_transfer",
		bank: "bca",
		item: [
			{
				id: "1af4c1e6-a4d6-4a64-88b1-6c79b2b2c284",
				created_at: "2024-12-27T09:03:33.052978+00:00",
				label: "Furry Monster Keychain Doll",
				description:
					"Add a touch of whimsy to your day with this adorable furry monster keychain doll. Dressed in a soft, fluffy costume with cute bunny ears and a mischievous expression, this keychain is perfect for fans of quirky collectibles. Its compact size makes it ideal for hanging on your bag, keys, or even as a unique desk companion. Made with high-quality materials, this keychain doll is both durable and eye-catching—a fun accessory for anyone who loves playful designs.",
				price: 729000,
				isFeatured: true,
				isNew: false,
				onSale: true,
				quantity: 7,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731503440/z221phluqqvhcjnvdesm.webp",
				productId: "9244dbed-a488-4795-8b9d-db98ea990b91",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
		],
	},
	{
		id: "c59285c6-b67f-420a-85aa-ee69dad1bc99",
		created_at: "2024-12-27T09:47:38.029784+00:00",
		clerk_id: {
			id: "6a780c34-5e4c-4230-949c-b1c9515de991",
			tlp: 85171612738,
			name: "Vindiar Johan Diputra",
			email: "vindiari5c@gmail.com",
			address: "Gg Adam 1234",
			clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			imageUrl:
				"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycE5uVXJqTzlhV1pnTDFYaEhRS29wQ056eFYifQ",
			created_at: "2024-12-13T09:53:04.240615+00:00",
			postal_code: 16451,
		},
		gross_amount: 2282635,
		payment_type: "bank_transfer",
		bank: "bca",
		item: [
			{
				id: "e4f359c9-28eb-4a61-a051-8af71f895cb3",
				created_at: "2024-12-27T09:46:45.185307+00:00",
				label: "Furry Monster Keychain Doll",
				description:
					"Add a touch of whimsy to your day with this adorable furry monster keychain doll. Dressed in a soft, fluffy costume with cute bunny ears and a mischievous expression, this keychain is perfect for fans of quirky collectibles. Its compact size makes it ideal for hanging on your bag, keys, or even as a unique desk companion. Made with high-quality materials, this keychain doll is both durable and eye-catching—a fun accessory for anyone who loves playful designs.",
				price: 729000,
				isFeatured: true,
				isNew: false,
				onSale: true,
				quantity: 1,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731503440/z221phluqqvhcjnvdesm.webp",
				productId: "9244dbed-a488-4795-8b9d-db98ea990b91",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
			{
				id: "7890ea15-b912-4d12-b48c-34b3f8b9e723",
				created_at: "2024-12-27T09:46:50.439121+00:00",
				label: "90's Baby Dad Hat Baseball Cap",
				description:
					"100% bio-washed chino twill Unstructured, six-panel, low-profile Pre-curved visor Self-fabric tri-glide buckle closure. Printed with high quality vinyl\n",
				price: 440470,
				isFeatured: true,
				isNew: false,
				onSale: false,
				quantity: 1,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731503798/nbi6jozbnfnxvpgvo4nr.jpg",
				productId: "6b925f34-aea2-45d8-b343-1c14ff35a7b4",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
			{
				id: "95e1270c-9bca-43b4-ae3f-7a709e4125c3",
				created_at: "2024-12-27T09:46:59.199816+00:00",
				label: "Rolex GMT Master 1675",
				description:
					"A remarkably rare and stunning stainless steel double signed Rolex GMT Master, reference 1675, from 1978, showcasing a beautifully patinated and vivid fuchsia bezel.\nIts matte black dial and cream-colored luminous hour markers elevate the design, attracting a world of travelers.\nIt is finished with a stainless steel oyster bracelet and folding clasp.\nThis watch is engraved with two names on the caseback. It is possible to remove upon request.\n\nReference Number: 1675\nModel: GMT Master\nMovement: Automatic\nCase Material: Stainless Steel\nBracelet Material: Stainless Steel\nDial: Matte Black\nCase Diameter: 40mm\nYear: 1978\nCondition: Vintage\nBox and Papers: No original box, no original papers\n\n100% Authenticity Guarantee",
				price: 1113165,
				isFeatured: true,
				isNew: false,
				onSale: false,
				quantity: 1,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731500573/fnc8cwxtrlpkyqwuchss.png",
				productId: "32b5ec6a-dd2a-4c1b-9ee3-4a0b2540f746",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
		],
	},
	{
		id: "3e23c4f4-a0af-4b47-9cdc-db71127fe4dc",
		created_at: "2024-12-27T09:47:38.268645+00:00",
		clerk_id: {
			id: "6a780c34-5e4c-4230-949c-b1c9515de991",
			tlp: 85171612738,
			name: "Vindiar Johan Diputra",
			email: "vindiari5c@gmail.com",
			address: "Gg Adam 1234",
			clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			imageUrl:
				"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycE5uVXJqTzlhV1pnTDFYaEhRS29wQ056eFYifQ",
			created_at: "2024-12-13T09:53:04.240615+00:00",
			postal_code: 16451,
		},
		gross_amount: 2282635,
		payment_type: "bank_transfer",
		bank: "bca",
		item: [
			{
				id: "e4f359c9-28eb-4a61-a051-8af71f895cb3",
				created_at: "2024-12-27T09:46:45.185307+00:00",
				label: "Furry Monster Keychain Doll",
				description:
					"Add a touch of whimsy to your day with this adorable furry monster keychain doll. Dressed in a soft, fluffy costume with cute bunny ears and a mischievous expression, this keychain is perfect for fans of quirky collectibles. Its compact size makes it ideal for hanging on your bag, keys, or even as a unique desk companion. Made with high-quality materials, this keychain doll is both durable and eye-catching—a fun accessory for anyone who loves playful designs.",
				price: 729000,
				isFeatured: true,
				isNew: false,
				onSale: true,
				quantity: 1,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731503440/z221phluqqvhcjnvdesm.webp",
				productId: "9244dbed-a488-4795-8b9d-db98ea990b91",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
			{
				id: "7890ea15-b912-4d12-b48c-34b3f8b9e723",
				created_at: "2024-12-27T09:46:50.439121+00:00",
				label: "90's Baby Dad Hat Baseball Cap",
				description:
					"100% bio-washed chino twill Unstructured, six-panel, low-profile Pre-curved visor Self-fabric tri-glide buckle closure. Printed with high quality vinyl\n",
				price: 440470,
				isFeatured: true,
				isNew: false,
				onSale: false,
				quantity: 1,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731503798/nbi6jozbnfnxvpgvo4nr.jpg",
				productId: "6b925f34-aea2-45d8-b343-1c14ff35a7b4",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
			{
				id: "95e1270c-9bca-43b4-ae3f-7a709e4125c3",
				created_at: "2024-12-27T09:46:59.199816+00:00",
				label: "Rolex GMT Master 1675",
				description:
					"A remarkably rare and stunning stainless steel double signed Rolex GMT Master, reference 1675, from 1978, showcasing a beautifully patinated and vivid fuchsia bezel.\nIts matte black dial and cream-colored luminous hour markers elevate the design, attracting a world of travelers.\nIt is finished with a stainless steel oyster bracelet and folding clasp.\nThis watch is engraved with two names on the caseback. It is possible to remove upon request.\n\nReference Number: 1675\nModel: GMT Master\nMovement: Automatic\nCase Material: Stainless Steel\nBracelet Material: Stainless Steel\nDial: Matte Black\nCase Diameter: 40mm\nYear: 1978\nCondition: Vintage\nBox and Papers: No original box, no original papers\n\n100% Authenticity Guarantee",
				price: 1113165,
				isFeatured: true,
				isNew: false,
				onSale: false,
				quantity: 1,
				image:
					"https://res.cloudinary.com/dtatajpiw/image/upload/v1731500573/fnc8cwxtrlpkyqwuchss.png",
				productId: "32b5ec6a-dd2a-4c1b-9ee3-4a0b2540f746",
				clerk_id: "user_2pNnUwgMUlmHidombIohhu5Ylst",
			},
		],
	},
];
export default function OrdersPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold mb-5">Orders</h1>
			<OrderTable data={orders} />
		</div>
	);
}
