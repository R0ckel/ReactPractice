import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Input, List, Modal, Switch, Table, Upload} from 'antd';
import {ProductListContext} from "../../../contexts/productListContext";
import {DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';

export const ProductListAdminView = () => {
	const {products, setProducts} = useContext(ProductListContext);
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
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
		form.resetFields();
		setVisible(true);
	};

	const handleEdit = (record) => {
		setEditingProduct(record);
		form.setFieldsValue(record);
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

	const handleOk = () => {
		form.submit();
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

	const productForm = (
		<Modal open={visible} onOk={handleOk} onCancel={handleCancel} forceRender>
			<Form form={form} onFinish={onFinish} style={{width: '100%', marginTop: '20px'}}>
				<Form.Item label="Category" name="category" rules={[{required: true}]}>
					<Input/>
				</Form.Item>

				<Form.Item label="Mark" name="mark" rules={[{required: true}]}>
					<Input/>
				</Form.Item>

				<Form.Item label="Model" name="model" rules={[{required: true}]}>
					<Input/>
				</Form.Item>

				<Form.Item label="Price" name="price" rules={[{required: true}]}>
					<Input type="number"/>
				</Form.Item>

				<Form.Item label="Image" name="image">
					<div>
						<Upload beforeUpload={handleUpload} showUploadList={false}>
							<Button icon={<UploadOutlined/>}>Click to upload</Button>
						</Upload>
						{imageUrl && <img src={imageUrl} alt="Preview" style={{width: 100, height: 100}}/>}
					</div>
				</Form.Item>
			</Form>
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
					       style={{backgroundColor: 'rgba(255,255,255,0.35)'}}/>
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