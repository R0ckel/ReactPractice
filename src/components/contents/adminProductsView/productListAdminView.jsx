import React, {useContext, useEffect, useState} from 'react';
import {Button, Input as AntdInput, List, Modal, Switch, Table, Upload} from 'antd';
import {ProductListContext} from "../../../contexts/productListContext";
import {DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";

const FormikInput = ({label, ...props}) => {
	const [field, meta] = useField(props);
	return (
		<>
			<MarginedLabel>
				{label}
				<AntdInput {...field} {...props} />
			</MarginedLabel>
			{meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
		</>
	);
};

const MarginedLabel = styled("label")`
  margin: 10px 0 2px;
`;

const MarginedButton = styled(Button)`
  margin-top: 20px;
`;

const Error = styled("div")`
  color: red;
`;

export const ProductListAdminView = () => {
	const {products, setProducts} = useContext(ProductListContext);
	const [visible, setVisible] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [imageUrl, setImageUrl] = useState('');
	const [tableView, setTableView] = useState(localStorage.getItem('tableView') === 'true');

	useEffect(() => {
		localStorage.setItem('tableView', tableView.toString());
	}, [tableView]);

	const columns = [
		{
			title: 'Image',
			dataIndex: 'image',
			align: 'center',
			render: (image, record) => (
				<img
					src={image}
					alt={record.model}
					style={{width: 100, height: 100}}
					onClick={() => handleEdit(record)}
				/>
			),
		},
		{
			title: 'Category',
			dataIndex: 'category',
			align: 'center',
		},
		{
			title: 'Mark',
			dataIndex: 'mark',
			align: 'center',
		},
		{
			title: 'Model',
			dataIndex: 'model',
			align: 'center',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			align: 'center',
		},
		{
			title: 'Actions',
			align: 'center',
			render: (_, record) => (
				<>
					<EditOutlined onClick={() => handleEdit(record)} type="primary" style={{marginRight: '1vw'}}>
						Edit
					</EditOutlined>
					<DeleteOutlined onClick={() => handleDelete(record)} danger="true">
						Delete
					</DeleteOutlined>
				</>
			),
		},
	];

	const handleAdd = () => {
		setEditingProduct(null);
		setImageUrl('');
		setVisible(true);
	};

	const handleEdit = (record) => {
		setEditingProduct(record);
		setImageUrl(record.image);
		setVisible(true);
	};

	const handleDelete = (record) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this product?',
			onOk: () => {
				setProducts(products.filter((product) => product.id !== record.id));
			},
		});
	};

	const handleUpload = (file) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImageUrl(e.target.result ?? "");
		};
		reader.readAsDataURL(file);
		return false;
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const onFinish = (values) => {
		if (editingProduct) {
			setProducts(
				products.map((product) =>
					product.id === editingProduct.id ? {...values, id: editingProduct.id, image: imageUrl} : product
				)
			);
		} else {
			const maxId = Math.max(...products.map((product) => product.id));
			setProducts([...products, {...values, id: maxId + 1, image: imageUrl}]);
		}
		setVisible(false);
	};

	const maxPrice = 100500
	const validationSchema = Yup.object({
		category: Yup.string().required().max(40, 'Category name must be below 40 characters long'),
		mark: Yup.string().required().max(50, 'Mark name must be below 50 characters long'),
		model: Yup.string().required().max(100, 'Model name must be below 100 characters long'),
		price: Yup.number().required()
		.positive(`Price must be positive number`)
		.max(maxPrice, `Price can\`t be above ${maxPrice}`)
	});

	const productForm = (
		<Modal
			title={"Product Form"}
			open={visible}
			onCancel={handleCancel}
			forceRender
			footer={null}
			width={'90vw'}
		>
			<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
				<Formik
					initialValues={{
						category: editingProduct?.category ?? '',
						mark: editingProduct?.mark ?? '',
						model: editingProduct?.model ?? '',
						price: editingProduct?.price ?? '',
					}}
					validationSchema={validationSchema}
					onSubmit={onFinish}
					enableReinitialize
				>
					{({handleSubmit}) => (
						<div style={{display: 'flex', justifyContent: 'center', overflow: 'auto', width: '100%'}}>
							<Form style={{width: '100%'}}>
								<FormikInput label="Category" name="category"/>
								<FormikInput label="Mark" name="mark"/>
								<FormikInput label="Model" name="model"/>
								<FormikInput label="Price" name="price" type="number"/>
								<div>
									<MarginedLabel>
										Image:
										<Upload beforeUpload={handleUpload} showUploadList={false}>
											<Button icon={<UploadOutlined/>}>Click to upload</Button>
										</Upload>
									</MarginedLabel>
									{imageUrl && <img src={imageUrl} alt="Preview" style={{width: 100, height: 100}}/>}
								</div>
								<div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
									<MarginedButton onClick={handleCancel} style={{marginRight: '1rem'}}>
										Cancel
									</MarginedButton>
									<MarginedButton onClick={handleSubmit} type="primary">
										Submit
									</MarginedButton>
								</div>
							</Form>
						</div>
					)}
				</Formik>
			</div>
		</Modal>
	);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				textAlign: 'center',
				width: '100%',
				padding: '1vh 6vw',
			}}
		>
			<h1 style={{marginTop: '0px', marginBottom: '10px'}}>ADMIN PANEL - PRODUCTS</h1>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Button
					onClick={handleAdd}
					type="primary"
					icon={<PlusOutlined/>}
					style={{
						backgroundColor: '#287c00',
						borderColor: '#52c41a',
						margin: '1vh ',
					}}
				>
					Add Product
				</Button>
				<Switch checked={tableView} onChange={(checked) => setTableView(checked)}/>
			</div>

			{tableView ? (
				<>
					<Table dataSource={products} columns={columns} rowKey="id"
					       style={{backgroundColor: 'rgba(255,255,255,0.5)'}}/>
					{productForm}
				</>
			) : (
				<>
					<List
						itemLayout="horizontal"
						dataSource={products}
						style={{
							backgroundColor: 'rgba(255,255,255)',
							padding: '20px',
							borderRadius: '10px'
						}}
						renderItem={(item) => (
							<List.Item
								actions={[
									<EditOutlined onClick={() => handleEdit(item)} type="primary" style={{marginRight: '1vw'}}/>,
									<DeleteOutlined onClick={() => handleDelete(item)} danger="true"/>,
								]}
							>
								<List.Item.Meta
									avatar={<img src={item.image} alt={item.model} style={{width: 50, height: 50}}/>}
									title={`${item.category} - ${item.mark} ${item.model}`}
									description={`$${item.price}`}
								/>
							</List.Item>
						)}
					/>
					{productForm}
				</>
			)}
		</div>
	);
}